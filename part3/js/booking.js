
        jQuery(document).ready(($) => {
            $('.quantity').on('click', '.plus', function (e) {
                let $input = $(this).prev('input.qty');
                let val = parseInt($input.val());
                $input.val(val + 1).change();
            });

            $('.quantity').on('click', '.minus',
            function (e) {
                let $input = $(this).next('input.qty');
                var val = parseInt($input.val());
                if (val > 0) {
                  
                  if($input.attr("id") == "adults" && $('#adults').val() <= 1){
                    return false;
                  }
                  
                    $input.val(val - 1).change();
                }
            });

            $('#agreerule').click(function () {
              $('#submitform').attr('disabled',!$("#agreerule").prop("checked"));
            })

            document.getElementById('cardnumberNp').addEventListener('input', function (e) {
              e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
            });

            $(function () {
              var date = new Date();
              date.setDate(date.getDate());
             
              $("#datepicker_checkin").datepicker({
                onSelect: function(date) {
                  var date2 = $('#datepicker_checkin').datepicker('getDate');
                  var nextDayDate = new Date();
                  nextDayDate.setDate(date2.getDate() + 1);
                  $('#datepicker_checkout').datepicker('option', 'minDate', nextDayDate);
                }, 
                
                  startDate: date,
                  dateFormat: 'dd/mm/yy',
                  minDate: 0
              });

              $("#datepicker_checkout").datepicker({
                  startDate: date,
                  dateFormat: 'dd/mm/yy',
                  minDate: 0
              });

              
            });


        });



$(document).ready(function () {


  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;

  setProgressBar(current);

  $(".next").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();


  if(current == 1) { //booking date page
    if($('#datepicker_checkin').val() == ''){
      swal("Check-in date", "Please select when would you like to stay","warning");
      return false;
    } else if ($('#datepicker_checkout').val() == '') {
      swal("Check-out date", "Please select when would you like to leave","warning");
      return false;
    } 
  }  else if(current == 3) { //personal page

      if ($('#fnameNp').val() == '' || $('#lnameNp').val() == '') {
        swal("Guest's name", "Please fill first name and last name before go to the next section.","warning");
        return false;
      } else if ($('#phoneNp').val() == '') {
        swal("Contact number", "Please fill in the contact number.","warning");
        return false;
      } else if (validateEmail($('#emailNp').val()) == false) {
        swal("Invalid email", "Please fill in the correct email.","warning");
        return false;
      }
  } else if(current == 4) { //payment page

    if ($('#cardnumberNp').val() == '' || $('#expirationnumberNp').val() == '' || $('#cvvnumberNp').val() == '') {
      swal("Payment infomation", "Please fill card information in order to make a payment","warning");
      return false;
    } else {
      swal("Success!", "Your booking has been confirmed","success");
    }
  }

    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(++current);
  });

  $(".previous").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $("#progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(--current);
  });

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

  $(".submit").click(function () {
    const adults = $("#adults").val();
    const children = $("#children").val();
    const title = $("#titlename").val();
    $("#nameDp").text(
      title + "." + $("#fnameNp").val() + " " + $("#lnameNp").val()
    );
    $("#emailDp").text($("#emailNp").val());
    $("#phoneDp").text($("#phoneNp").val());
    $("#guestDp").text(
      Number(adults) +
        Number(children) +
        ` (adults: ${adults}, children: ${children})`
    );

    $("#additionalDp").text($("#additionalNp").val());

    const checkin = $("#datepicker_checkin").val();
    const checkout = $("#datepicker_checkout").val();
    $("#checkinDp").text(checkin);
    $("#checkoutDp").text(checkout);

    const room = [
      {
        name: "Suite Room",
        price: 150,
      },
      {
        name: "Deluxe Room",
        price: 190,
      },
    ];


    var daynum;
    function calday(start_date, end_date) {
      var checkinDate = start_date;
      checkinDate = new Date(checkinDate.split('/')[2],checkinDate.split('/')[1]-1,checkinDate.split('/')[0]);
      var checkoutDate = end_date;
      checkoutDate = new Date(checkoutDate.split('/')[2],checkoutDate.split('/')[1]-1,checkoutDate.split('/')[0]);
      var timeDiff = Math.abs(checkinDate.getTime() - checkoutDate.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      return diffDays;
    }

    const roomtype = $("#roomtype input[type='radio']:checked").val();
    var daynum = calday(checkin, checkout); 
    if (roomtype === "small") {
      $("#roomtypeDp").text(room[0].name);
      $("#totalamount").text(daynum +" night(s) x $" + room[0].price + " = $" + room[0].price * daynum);
    } else if (roomtype === "big") {
      $("#roomtypeDp").text(room[1].name);
      $("#totalamount").text(daynum +" night(s) x $" + room[1].price + " = $" + room[1].price * daynum);
    }

    function checkbox(s) {
      if ($(`${s}`).is(":checked")) return "Yes";
      return "No";
    }

    const smoking = checkbox("#smokingNp");
    if (smoking) $("#smokingDp").text(smoking);

    const cookig = checkbox("#cookigNp");
    if (cookig) $("#cookigDp").text(cookig);

    const swim = checkbox("#swimNp");
    if (swim) $("#swimDp").text(swim);

    $("#piliowDp").text($("#piliowNp").val());

    var cardnumber_origin = $("#cardnumberNp").val();
    var cardnumber_blur = cardnumber_origin.substr(0, cardnumber_origin.length - 4) + '****';
    $("#cardnumberDp").text(cardnumber_blur);

    const tshirtcollor = $("#tshirtNp").val();
    document.getElementById('tshirtcolor').setAttribute("style", "width: 20px;height: 20px;border-radius: 20px;background-color:"+tshirtcollor);

  });
});


