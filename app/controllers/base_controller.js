module.exports = {
    success: function(data) {
        if(data.constructor === String){
            return {
                'success': true,
                'data': {
                    'massage' : data
                }
            };
        }
        return {
            'success': true,
            'data': data
        };
    },
    error: function (massage) {
        return {
            'success': false,
            'data': {
                'error' : massage
            }
        };
    }
};

