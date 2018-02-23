module.exports = {
    success: function(data) {
        if(data.constructor === String){
            return {
                'type': true,
                'massage': data
            };
        }
        return {
            'type': true,
            'data': data
        };
    },
    error: function (massage) {
        return {
            'type': false,
            'massage': massage
        };
    }
};

