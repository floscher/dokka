import org.jetbrains.dokka.gradle.DokkaTask
import java.net.URL

plugins {
    kotlin("multiplatform")
    id("org.jetbrains.dokka")
}

apply(from = "../template.root.gradle.kts")

kotlin {
    jvm()
    linuxX64("linux")
    macosX64("macos")
    js()
    sourceSets {
        named("commonMain") {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.8-1.4.0-rc")
            }
        }
    }
}

tasks.withType<DokkaTask> {
    dokkaSourceSets {
        create("commonMain")
        create("jvmMain")
        create("linuxMain")
        create("macosMain")
        create("jsMain")
        configureEach {
            externalDocumentationLink {
                url = URL("https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-core/")
            }
        }
    }
}
