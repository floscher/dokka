import React from "react";
import { IWindow } from "../search/types";
import './pageSummary.scss'

type PageSummaryProps = {
    category: string,
    entries: PageSummaryEntry[]
}

type PageSummaryEntry = {
    dri: string,
    label: string
}

export const PageSummary: React.FC<PageSummaryProps> = ({category, entries}: PageSummaryProps) => {
    const items = entries.map((item) => <li><a href={`${(window as IWindow).pathToRoot}#${item.dri}`}>{item.label}</a></li>)
    return (
        <div className={"page-summary " + category}>
            <div className={"content-wrapper"}>
                <h4>On this page:</h4>
                <ul>
                    {items}
                </ul>
            </div>
        </div>
    )
}