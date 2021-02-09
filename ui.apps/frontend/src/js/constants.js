define({
    CONSTANT_VALUE: "sample",
    LOG_LEVEL: 2,
    CHANNELS:{
        asset_root:{
            CHANNEL:'asset_root',
            topics:{
                ROOT_CHANGE:'root.change',
                FILTER_CHANGE:'filter.change'
            }
        },
        asset_item:{
            CHANNEL:'asset_item',
            topics:{
                SIZE_CHANGE:'size.change'
            }
        },

    }
});
