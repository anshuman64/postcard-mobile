// Local Imports
import PostAPI from '../api/post_api';

//--------------------------------------------------------------------//

export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST  = 'REMOVE_POST';

//     ____                        _        _   _
//    / ___| _   _ _ __   ___     / \   ___| |_(_) ___  _ __  ___
//    \___ \| | | | '_ \ / __|   / _ \ / __| __| |/ _ \| '_ \/ __|
//     ___) | |_| | | | | (__   / ___ \ (__| |_| | (_) | | | \__ \
//    |____/ \__, |_| |_|\___| /_/   \_\___|\__|_|\___/|_| |_|___/
//          |___/

export let receivePost = (data) => ({
  type: RECEIVE_POST,
  data
});

export let removePost = (data) => ({
  type: REMOVE_POST,
  data
});

//        _                              _        _   _
//       / \   ___ _   _ _ __   ___     / \   ___| |_(_) ___  _ __  ___
//      / _ \ / __| | | | '_ \ / __|   / _ \ / __| __| |/ _ \| '_ \/ __|
//     / ___ \\__ \ |_| | | | | (__   / ___ \ (__| |_| | (_) | | | \__ \
//    /_/   \_\___/\__, |_| |_|\___| /_/   \_\___|\__|_|\___/|_| |_|___/
//                 |___/
