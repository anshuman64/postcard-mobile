// Library Imports
import { NativeModules } from 'react-native';

//--------------------------------------------------------------------//

const DEFAULT_MEDIA_OPTIONS = {};

// CREDIT: https://github.com/facebook/react-native/issues/8986
class MediaLibrary {

  fetchMedia(opts = {}) {
    const options = {...DEFAULT_MEDIA_OPTIONS, ...opts};
    return NativeModules.MediaLibrary.getMedia(options);
  }
}

export default new MediaLibrary();
