// Library Imports
import { CameraRoll } from 'react-native';

//--------------------------------------------------------------------//

const DEFAULT_MEDIA_OPTIONS = {
  first: 1000
};

// CREDIT: https://github.com/facebook/react-native/issues/8986
class MediaLibrary {

  fetchMedia(opts = {}) {
    const getPhotos = (media, after) => {
      const options = {...DEFAULT_MEDIA_OPTIONS, ...opts, after};
      return CameraRoll.getPhotos(options).then(data => {
        const assets = data.edges;
        media = media.concat(assets.map(asset => asset.node.image));
        return data.page_info.has_next_page ? getPhotos(media, data.page_info.end_cursor) : media;
      });
    };
    return getPhotos([]);
  }
}

export default new MediaLibrary();
