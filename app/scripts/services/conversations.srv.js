(function () {
    'use strict';

    // Conversations service
    function ConversationsSrv($http, $q) {
        var conversations;

        /**
         * Get an entity by its id
         * @return the id if the entity exists, otherwise -1
         */
        function getConversationIndexFromId(conversations, id) {
            for (var i = 0; i < conversations.length; i++) {
                if(conversations[i]._id === id) {
                    return i;
                }
            }
            return -1;
        }

        function loadConversations() {
            if(!conversations) {
                return $http.get('data/conversations.json').then(function (response) {
                    conversations = response.data;
                    return conversations;
                }, function (response) {
                    console.log('Erreur conversations.json : ' + response.status);
                });
            } else {
                return $q.resolve(conversations);
            }
        }

        this.findAll = function() {
            return loadConversations();
        };

        this.findOne = function(id) {
            return conversations ? conversations[getConversationIndexFromId(conversations, id)] : null;
        };
    }


    angular.module('whatsapp.services')
        .service('ConversationsSrv', ConversationsSrv);


    ConversationsSrv.$inject = ['$http', '$q'];
})();
