#!/bin/bash
JAVA_HOME=$(grep JAVA_HOME .env | cut -d '=' -f2)
ANDROID_HOME=$(grep ANDROID_HOME .env | cut -d '=' -f2)

rm -rf .cache
export JAVA_HOME
export ANDROID_HOME
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

cd android && ./gradlew assembleRelease -PMYAPP_UPLOAD_STORE_FILE='${{ secrets.MYAPP_UPLOAD_STORE_FILE }}' -PMYAPP_UPLOAD_KEY_ALIAS='${{ secrets.MYAPP_UPLOAD_KEY_ALIAS }}' -PMYAPP_UPLOAD_STORE_PASSWORD='${{ secrets.PMYAPP_UPLOAD_STORE_PASSWORD }}' -PMYAPP_UPLOAD_KEY_PASSWORD='${{ secrets.PMYAPP_UPLOAD_STORE_PASSWORD }}'
