// Local Imports
import * as APIUtility from '../utilities/api_utility';

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//


//     ___       _             __
//    |_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___
//    | || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
//    | || | | | ||  __/ |  |  _| (_| | (_|  __/
//    |___|_| |_|\__\___|_|  |_|  \__,_|\___\___|


export const createLike = (payload) => {
  return APIUtility.post('/likes', payload);
};

export const deleteLike = (likeId) => {
  return APIUtility.del('/likes/' + likeId);
};
