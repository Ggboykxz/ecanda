@echo off
set JAVA_HOME=C:/Users/hp/Downloads/Compressed/OpenJDK17U-jdk_x64_windows_hotspot_17.0.18_8/jdk-17.0.18+8
set ANDROID_HOME=C:/Users/hp/AppData/Local/Android/Sdk
set PATH=%JAVA_HOME%\bin;%PATH%
cd C:\Users\hp\Desktop\ECANDA\android
call gradlew.bat assembleDebug --warning-mode all