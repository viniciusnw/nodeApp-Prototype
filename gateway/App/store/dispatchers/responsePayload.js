module.exports = responsePayload = {
    defaultReponse: {
        hasError: false,
        hasValue: true,
        messages: null,
        value: null,
        status: null
    },

    successResponse: (data) => {
        return {
            hasError: false,
            hasValue: true,
            messages: null,
            value: data,
            status: 200 // processado com successo
        }
    },

    errorResponse: (err, status) => {
        return {
            hasError: true,
            hasValue: false,
            messages: err.message,
            value: null,
            status: status // 400: invalid payload | 406: não conseguiu processar
        }
    }
}