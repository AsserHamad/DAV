import { FilesCollection } from 'meteor/ostrio:files';
export const CatalogueImages = new FilesCollection({
  collectionName: 'catalogue-images',
  storagePath: 'assets/Images/Catalogue'
});
export const CatalogueInfo = new Mongo.Collection('catalogue-info');
