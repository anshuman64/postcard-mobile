# insiya-mobile

## General Setup
````
git clone https://github.com/anshuman64/insiya-mobile.git
cd insiya-mobile
npm install
````

## iOS
````
cd ios && pod install && cd ..
open ./node_modules/react-native/React/Base/RCTBridgeModule.h
````
Edit ````#import <React/RCTDefines.h>```` to ````#import "RCTDefines.h" ````

Open XCode
Click on Pods
Select react-native-amplitude-analytics from the dropdown
Click Header Search Paths
Enter "$(PODS_ROOT)/../../node_modules/react-native/React/" recursive
