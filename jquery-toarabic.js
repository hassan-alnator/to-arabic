/*////////////////////////////
* toArabic jQuery Plugin v0.1
*
* author: Hassan Lotfi Alnatour
* 
* first release: 09/09/2014
*////////////////////////////


(function ($, undefined) {

    // Arabic Numbers definitions 
    var billons = ['', 'مليار', 'ملياران', 'ثلاثة مليارات', 'اربعة مليارات', 'خمسة مليارات', 'ست مليارات', 'سبعة مليارات', 'ثمنية مليارات', 'تسعة مليارات'];
    var millions = ['', 'مليون', 'مليونان', 'ثلاثة ملايين', 'اربعة ملايين', 'خمسة ملايين', 'ست ملايين', 'سبعة ملايين', 'ثمنية ملايين', 'تسعة ملايين'];
    var thousands = ['', 'الف', 'الفان', 'ثلاثة الاف', 'اربعة الاف', 'خمسة الاف', 'ست الاف', 'سبعة الاف', 'ثمانية الاف', 'تسعة الاف'];
    var unit = ['', 'واحد', 'اثنان', 'ثلاثة', 'اربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
    var tens = ['عشرة', 'أحدا عشر', 'اثنا عشر', 'ثلاثة عشر', 'ارابع عشر', 'خامس عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
    var decs = ['', 'عشرة', 'عشرون', 'ثلاثون', 'اربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
    var hundreds = ['', 'مائه', 'مئتان', 'ثلاث مئة', 'اربع مئة', 'خمس مئة', 'ست مئة', 'سبع مئة', 'ثمن مئة', 'تسع مئة'];

    $.fn.toArabic = function (paramA, paramB) {
        if (typeof(paramA) == 'function') {
            options = {};
            callback = paramA;
        } else {
            options = paramA;
            callback = paramB;
        }

        var config = $.extend({}, $.fn.toArabic.config, options);
        var number = 0;

        var that = this;

        function dec(n1, n2) {

            /*
                decimal mapping
            */
            var endvalue = "";
            if (n1 == "0") {
                endvalue = unit[n2];
            } else {
                if (n2 == '0') {
                    endvalue = decs[n1];
                } else {

                    if (n1 == "1") {
                        endvalue = tens[n2];
                    } else {
                        endvalue += unit[n2];
                        endvalue += ' و';
                        endvalue += decs[n1];
                    }
                }
            }
            return endvalue;
        }


        function hundred(n1, n2, n3) {
            /*
                Hundreds Mapping
            */
            var endvalue = "";

            endvalue += hundreds[n1];

            if (n2 != "0" || n3 != "0") {
                endvalue += ' و';
            }

            endvalue += dec(n2, n3);

            return endvalue;
        }


        function ArabicMaping(endvalue,number,len,numbers,element){
            /*
                full Result depending on the length on the number

            */

            if (len == 1) {

                endvalue += unit[ numbers[len - 1] ];
            } else if (len == 2) {

                if (numbers[0] == '1') {
                    endvalue = tens[numbers[1]];
                } else {
                    endvalue += unit[numbers[len - 1] ];
                    if (numbers[len - 1] != '0') {
                        endvalue += ' و';
                    }
                    endvalue += decs[numbers[len - 2] ];
                }
            } else if (len == 3) {

                endvalue += hundreds[numbers[len - 3] ];
                if (numbers[len - 2] != "0" || numbers[len - 1] != "0") {
                    endvalue += ' و';
                }
                endvalue += dec(numbers[len - 2], numbers[len - 1]);
            } else if (len == 4) {

                endvalue += thousands[numbers[len - 4]];
                if (numbers[len - 3] != "0") {
                    endvalue += ' و';
                }
                endvalue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);
            } else if (len == 5) {

                endvalue += dec(numbers[len - 5], numbers[len - 4]);
                endvalue += numbers[len - 5] == "1" ? ' ألاف ' : ' الف ';
                if (numbers[len - 3] != "0") {
                    endvalue += ' و';
                }
                endvalue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);

            } else if (len == 6) {

                endvalue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);
                endvalue += numbers[len - 6] == "1" ? ' ألاف ' : ' الف ';
                endvalue += numbers[len - 5] != "0" && numbers[len - 4] != "0" ? ' و' : '';
                endvalue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);

            } else if (len == 7) {
                endvalue += millions[numbers[len - 7]];
                endvalue += numbers[len - 6] != "0" ? ' و' : '';
                endvalue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);
                if (numbers[len - 6] != "0") {
                    endvalue += numbers[len - 6] == "1" ? ' ألاف ' : ' الف ';
                }
                endvalue += numbers[len - 5] != "0" && numbers[len - 4] != "0" ? ' و' : '';
                endvalue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);

            } else if (len == 8) {

                endvalue += dec(numbers[len - 8], numbers[len - 7]);
                endvalue += ' مليون ';
                if (numbers[len - 6] != "0") {
                    endvalue += ' و ';
                }
                endvalue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);
                if (numbers[len - 6] != "0") {
                    endvalue += numbers[len - 6] == "1" ? ' ألاف ' : ' الف ';
                }
                endvalue += numbers[len - 5] != "0" && numbers[len - 4] != "0" ? ' و' : '';
                endvalue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);

            } else if (len == 9) {

                endvalue += hundred(numbers[len - 9], numbers[len - 8], numbers[len - 7]);
                endvalue += ' مليون ';
                if (numbers[len - 6] != "0") {
                    endvalue += ' و ';
                }
                endvalue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);
                if (numbers[len - 6] != "0") {
                    endvalue += numbers[len - 6] == "1" ? ' ألاف ' : ' الف ';
                }
                endvalue += numbers[len - 5] != "0" && numbers[len - 4] != "0" ? ' و' : '';
                endvalue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);

            } else if (len == 10) {

                endvalue += billons[numbers[len - 10]];
                if (numbers[len - 9] != "0") {
                    endvalue += ' و ';
                }
                endvalue += hundred(numbers[len - 9], numbers[len - 8], numbers[len - 7]);
                if (numbers[len - 9] != "0") {
                    endvalue += ' مليون ';
                }
                if (numbers[len - 8] != "0") {

                    endvalue += ' و ';
                }
                endvalue += hundred(numbers[len - 6], numbers[len - 5], numbers[len - 4]);
                if (numbers[len - 6] != "0") {
                    endvalue += numbers[len - 6] == "1" ? ' ألاف ' : ' الف ';
                }
                endvalue += numbers[len - 5] != "0" && numbers[len - 4] != "0" ? ' و' : '';
                endvalue += hundred(numbers[len - 3], numbers[len - 2], numbers[len - 1]);

            }
                // Append Value
                if(typeof config.target == "undefined"){
                    $(element).val(endvalue);
                }else{
                    $(config.target).val(endvalue);
                }
                
        }

        this.focusout(function () {

            var endvalue = '';
            var number = $(this).val().replace(/,/g, '');
            var len = number.length;
            var numbers = number.split('');

            ArabicMaping(endvalue,number,len,numbers,this);
          


        });

    }


})(jQuery);

