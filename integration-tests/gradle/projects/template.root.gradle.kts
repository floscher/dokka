allprojects {
    repositories {
        jcenter()
        mavenLocal()
        mavenCentral()
        google()
        maven("https://dl.bintray.com/kotlin/kotlin-eap/")
        maven("https://dl.bintray.com/kotlin/kotlin-dev/")
    }
}

afterEvaluate {
    logger.quiet("Gradle version: ${gradle.gradleVersion}")
    logger.quiet("Kotlin version: ${properties["dokka_it_kotlin_version"]}")
    properties["dokka_it_android_gradle_plugin_version"]?.let { androidVersion ->
        logger.quiet("Android version: $androidVersion")
    }
}
