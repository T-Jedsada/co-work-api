module.exports = {
    success: function(data) {
        if(data.constructor === String){
            return {
                success: true,
                data: {
                    'message' : data
                }
            };
        }
        return {
            success: true,
            data: data
        };
    },
    error: function (message) {
        return {
            success: false,
            data: {
                error : message
            }
        };
    }
};

