import React, { useCallback, useState, useEffect } from 'react';
import {Select, List} from '@jetbrains/ring-ui';
import { DokkaFuzzyFilterComponent } from '../search/dokkaFuzzyFilter';
import { IWindow, Option } from '../search/types';
import './navigationPaneSearch.scss';

export const NavigationPaneSearch = () => {
    const defaultWidth = 300

    const [navigationList, setNavigationList] = useState<Option[]>([]);
    const [selected, onSelected] = useState<Option | null>(null);
    const [minWidth, setMinWidth] = useState<number>(defaultWidth);
    
    const onChangeSelected = useCallback(
        (element: Option) => {
            window.location.replace(`${(window as IWindow).pathToRoot}${element.location}`)
            onSelected(element);
        },
        [selected]
    );

    const onFilter = (filterValue: string, filteredRecords?: Option[]) => {
        if(filteredRecords){
            const requiredWidth = Math.max(...filteredRecords.map(e => e.label.length*9), defaultWidth)
            setMinWidth(requiredWidth)
        }
    }

    useEffect(() => {
        fetch(`${(window as IWindow).pathToRoot}/scripts/navigation-pane.json`)
            .then(response => response.json())
            .then((result) => {
                setNavigationList(result.map((record: Option) => {
                    return {
                        ...record,
                        rgItemType: List.ListProps.Type.CUSTOM
                    }
                }))
            },
            (error) => {
                console.error('failed to fetch navigationPane data', error)
                setNavigationList([])
            })
    }, [])

    //@ts-ignore
    return <DokkaFuzzyFilterComponent
                id="navigation-pane-search"
                className="navigation-pane-search"
                inputPlaceholder="Title filter"
                filter={{fuzzy:true}}
                type={Select.Type.INPUT_WITHOUT_CONTROLS}
                clear
                selected={selected}
                data={navigationList}
                popupClassName={"navigation-pane-popup"}
                onSelect={onChangeSelected}
                onFilter={onFilter}
                minWidth={minWidth}
            />
}