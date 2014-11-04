(function ($) {

    "use strict";

    /* ==========================================================================
                            check document is ready, then
   ========================================================================== */

    $(document).ready(function () {
        
            var $boyCounter = $(".boycounter");

            if ($boyCounter.length) {

                $.backstretch([
                             '../assets/images/slider/1.jpg'
                             , '../assets/images/slider/2.jpg'
                             , '../assets/images/slider/3.jpg'
                ],
                         { duration: 4000, fade: 1000 })
                ;

                //enter the last menstrual period date using the date format  year, month, day
                $boyCounter.tictic({
                    date: {
                        year: 2014,
                        month: 4,
                        day: 29
                    },
                    charts: {
                        disableAnimation: false,
                        darkerColor: '#598DCC',
                        lighterColor: '#83B7EF'
                    }
                });

            }
    });

})(window.jQuery);

