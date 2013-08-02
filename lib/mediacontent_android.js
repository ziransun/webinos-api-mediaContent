var fs = require('fs');

function MediaContentAndroid () {

    var androidModule = require('bridge').load(
            'org.webinos.android.impl.mediacontent.MediaSourceManagerImpl', this);
    var localSource = androidModule.getLocalMediaSource();
    
    this.getLocalFolders = function(params, successCB, errorCB) {
        try {
            localSource.getFolders(successCB, errorCB);      
        } catch (err) {
            errorCB(err);
        }
    };
    
    this.findItem = function(params, successCB, errorCB) {
        try {
            if (params.offset) {
                  offset = parseInt(params.offset, 10);
                  console.log("offset:", offset);
            }
            
            if (params.count) {
                  count = parseInt(params.count, 10);
                  console.log("count: ", count);
            }
            
            localSource.findItems(function(mediaItemCollection) {
                var mediaItems = [];
                for ( var j = 0; j < mediaItemCollection.size; j++) {
                    if (mediaItemCollection.audios[j] != null) {
                        mediaItems[j] = mediaItemCollection.audios[j];
                    } else if (mediaItemCollection.images[j] != null) {
                        mediaItems[j] = mediaItemCollection.images[j];
                    } else if (mediaItemCollection.videos[j] != null) {
                        mediaItems[j] = mediaItemCollection.videos[j];
                    }
                }
                successCB(mediaItems);
            },  errorCB, params.folderId, params.filter, params.sortMode, 0, 0);
             //errorCB, params.folderId, params.filter, params.sortMode, count, offset);
             //errorCB, params.folderId, null, null, count, offset);
 
        } catch (err) {
            errorCB(err);
        }
    };
     
    /**
     * This functionality is not implemented.
     */
    this.updateItem = function (params, successCB, errorCB, item) {
    };
    
    /**
     * This functionality is not implemented.
     */
    this.updateItemsBatch = function (params, successCB, errorCB, items) {
    };
};

var mediaContent = new MediaContentAndroid();

exports.getLocalFolders = mediaContent.getLocalFolders;
exports.findItem = mediaContent.findItem;
exports.updateItem = mediaContent.updateItem;
exports.updateItemsBatch = mediaContent.updateItemsBatch;