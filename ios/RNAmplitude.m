#import "RNAmplitude.h"
#import "Amplitude.h"
#import "AMPIdentify.h"

@implementation RNAmplitude

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
 return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(initializeApiKey:(NSString *)apiKey) {
 [[Amplitude instance] initializeApiKey:apiKey];
}

RCT_EXPORT_METHOD(setUserId:(NSString *)userId) {
 [[Amplitude instance] setUserId:userId];
}

RCT_EXPORT_METHOD(setUserProperties:(NSDictionary *)properties) {
 [[Amplitude instance] setUserProperties:properties];
}

RCT_EXPORT_METHOD(logEvent:(NSString *)eventwithProperties:(NSDictionary *)properties) {
 [[Amplitude instance] logEvent:eventwithEventProperties:properties];
}

@end
