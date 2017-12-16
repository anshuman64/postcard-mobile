# insiya-mobile

## General Setup
1. Clone repository
````
git clone https://github.com/anshuman64/insiya-mobile.git
cd insiya-mobile
````

2. Install modules
````
npm install
````

## iOS
1. Install Pods
````
cd ios && pod install && cd ..
````

2.
````
open ./node_modules/react-native/React/Base/RCTBridgeModule.h. 
````
Edit ````#import <React/RCTDefines.h>```` to ````#import "RCTDefines.h" ````

3. Open XCode application
4. ````File > Open > $INSIYA-MOBILE/ios````
5. Click on "Pods" in left panel
6. Select react-native-amplitude-analytics from the dropdown at the top
7. Click on "Header Search Paths"
8. Add ````"$(PODS_ROOT)/../../node_modules/react-native/React/"````
9. Set as "Recursive"

![Alt text](./XCode_Amplitude_Header_Config.png)

