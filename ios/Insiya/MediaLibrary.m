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
                        @"uri": [NSString stringWithFormat:@"photos://%@", asset.localIdentifier]
                        }];
  }

  resolve(images);
}

RCT_EXPORT_METHOD(copyPhoto:(NSString *)id fileName:(NSString *)fileName resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    PHAsset *asset = [PHAsset fetchAssetsWithLocalIdentifiers:@[id] options:nil].lastObject;
    PHAssetResource *resource = [[PHAssetResource assetResourcesForAsset:asset] firstObject];
    NSString *PATH_MOVIE_FILE = [NSTemporaryDirectory() stringByAppendingPathComponent:fileName];
    PHAssetResourceRequestOptions *option =[PHAssetResourceRequestOptions new];
    option.networkAccessAllowed=YES;
    [[NSFileManager defaultManager] removeItemAtPath:PATH_MOVIE_FILE error:nil];
    [[PHAssetResourceManager defaultManager] writeDataForAssetResource:resource
                                                                toFile:[NSURL fileURLWithPath:PATH_MOVIE_FILE]
                                                               options:option
                                                     completionHandler:^(NSError * _Nullable error) {
                                                       if (error) {
                                                         NSError * err=[NSError errorWithDomain:@"test" code:0 userInfo:nil];
                                                         reject(@"0",error.description,err);
                                                       } else {
                                                         resolve(@{ @"path": PATH_MOVIE_FILE});
                                                       }
                                                     }];

  });
}

@end
