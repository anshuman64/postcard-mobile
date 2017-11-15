// Local Imports
import APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//


//     ___       _             __
//    |_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___
//    | || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
//    | || | | | ||  __/ |  |  _| (_| | (_|  __/
//    |___|_| |_|\__\___|_|  |_|  \__,_|\___\___|


let createLike = (payload) => {
  return APIUtility.post('/likes', payload);
};

let deleteLike = (likeId) => {
  return APIUtility.del('/likes/' + likeId);
};

const LikeAPI = {
  createLike: createLike,
  deleteLike: deleteLike
};


//--------------------------------------------------------------------//
//--------------------------------------------------------------------//

export default LikeAPI;
