import { FilesCollection } from 'meteor/ostrio:files';
export const ProfilePics = new FilesCollection({
  collectionName: 'profilepics',
  storagePath: 'assets/Images/Profile_Pics'
});
