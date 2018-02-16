#import "MediaLibrary.h"
#import <Photos/Photos.h>

@interface MediaLibrary ()

@property (nonatomic, strong) PHCachingImageManager *imageManager;

@end

@implementation MediaLibrary

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getMedia:(NSDictionary *)options resolver:(RCTPromiseResolveBlock)resolve rejector:(RCTPromiseRejectBlock)reject)
{
  [self checkPhotosPermissions:^(BOOL granted) {
    if (!granted) {
      reject(@"Permissions", @"Photos permission not granted", nil);
      return;
    }

    [self fetchMedia:options resolver:resolve rejector:reject];
  }];
}

- (PHCachingImageManager *)imageManager
{
  if (_imageManager == nil) {
    _imageManager = [PHCachingImageManager new];
  }

  return _imageManager;
}

- (void)checkPhotosPermissions:(void(^)(BOOL granted))callback
{
  PHAuthorizationStatus status = [PHPhotoLibrary authorizationStatus];
  if (status == PHAuthorizationStatusAuthorized) {
    callback(YES);
    return;
  } else if (status == PHAuthorizationStatusNotDetermined) {
    [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
      if (status == PHAuthorizationStatusAuthorized) {
        callback(YES);
        return;
      }
      else {
        callback(NO);
        return;
      }
    }];
  }
  else {
    callback(NO);
  }
}

- (void)fetchMedia:(NSDictionary *)options resolver:(RCTPromiseResolveBlock)resolve rejector:(RCTPromiseRejectBlock)reject
{
  PHFetchOptions *fetchOptions = [PHFetchOptions new];
  fetchOptions.sortDescriptors = @[[NSSortDescriptor sortDescriptorWithKey:@"creationDate" ascending:NO]];

  PHFetchResult *fetchResult = [PHAsset fetchAssetsWithMediaType:PHAssetMediaTypeImage options:fetchOptions];

  NSMutableArray *images = [[NSMutableArray alloc] init];
  for (PHAsset *asset in fetchResult) {
    [images addObject:@{
                        @"uri": [NSString stringWithFormat:@"ph://%@", asset.localIdentifier]
                        }];
  }

  resolve(images);
}

@end
