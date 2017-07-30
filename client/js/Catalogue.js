import { CatalogueImages, CatalogueInfo } from '../../collections/catalogue-images.js'

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});
Template.CatalogueLayout.helpers({
  showPics(){
    console.log(CatalogueInfo.find({}).fetch());
    return CatalogueInfo.find({}).fetch();
  },
  imageFile(){
    return CatalogueInfo.findOne();
  }
})

Template.uploadForm.events({
  'submit .uploadPic'(e, template) {
    if (e.target.fileInput.files && e.target.fileInput.files[0]) {
      e.preventDefault();
      if(CatalogueImages){
        console.log("We images booii");
      const upload = CatalogueImages.insert({
        file: e.target.fileInput.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
          fileObj.title = e.target.title.value;
          fileObj.uploadedAt = new Date();
          Meteor.call('catalogueInfo',fileObj,function(error){
            if(error)alert(error);
            else console.log(CatalogueInfo.find({}).fetch());
          });
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
    }
  }
});

Template.CatalogueLayout.events({
  'click .remove'(event){
    event.preventDefault();
    console.log(this.info);
    if(confirm("Are you sure you want to remove this post?")){
      CatalogueImages.remove({_id:this.info._id},function(error){
        if(error)alert(error);
        else {
          CatalogueInfo.remove({_id: this._id},function(error){
            if(error)alert(error);
            else console.log(CatalogueInfo.find());
          })
        }
      })
    }
  }
})
