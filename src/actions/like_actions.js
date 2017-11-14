// Local Imports
import LikeAPI from '../api/like_api';

//--------------------------------------------------------------------//

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const REMOVE_LIKE  = 'REMOVE_LIKE';

//     ____                        _        _   _
//    / ___| _   _ _ __   ___     / \   ___| |_(_) ___  _ __  ___
//    \___ \| | | | '_ \ / __|   / _ \ / __| __| |/ _ \| '_ \/ __|
//     ___) | |_| | | | | (__   / ___ \ (__| |_| | (_) | | | \__ \
//    |____/ \__, |_| |_|\___| /_/   \_\___|\__|_|\___/|_| |_|___/
//          |___/

export const receiveLike = (data) => ({
  type: RECEIVE_LIKE,
  data
});

export const removeLike = (data) => ({
  type: REMOVE_LIKE,
  data
});


//        _                              _        _   _
//       / \   ___ _   _ _ __   ___     / \   ___| |_(_) ___  _ __  ___
//      / _ \ / __| | | | '_ \ / __|   / _ \ / __| __| |/ _ \| '_ \/ __|
//     / ___ \\__ \ |_| | | | | (__   / ___ \ (__| |_| | (_) | | | \__ \
//    /_/   \_\___/\__, |_| |_|\___| /_/   \_\___|\__|_|\___/|_| |_|___/
//                 |___/
