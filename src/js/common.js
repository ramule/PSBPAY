var isKeyboardOpen = false;

 $(document).ready( function(){
  var themename =  localStorage.getItem("theme");
       $('html').attr('theme', themename)
 });



//############################################# THEME SETTINGS #########################################################

$('body').on('click', '.item-settings', function (e) {

  e.stopPropagation();
  $('#themePanel').toggleClass('notp-showing');
})

$('body').on('click', '.notification-panel', function (event) {
  event.stopPropagation();
});
$('body').click(function () {
  $('#themePanel').removeClass('notp-showing');
});
$('body').on('click', '.themechange li', function(){
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
 var theme = $(this). attr('theme')
 localStorage.setItem("theme", theme);
  $('html').attr('theme' , theme )
})

$('body').on('click', '.background-layout li' , function(){
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
   var layoutType = $(this).attr('layoutBg');
   $('html').attr('layout', layoutType)

})
$('body').on('click', '.sidebarnavbg li' , function(){
  $(this).addClass('active')
  $(this).siblings().removeClass('active')
   var sidenavbg = $(this).attr('sidenavbg');
   $('html').attr('sidenavbg', sidenavbg)

})
$('body').on('click', '.btn-closenoty', function(){
  $('#themePanel').removeClass('notp-showing');

})
//############################################# THEME SETTINGS ENDS #########################################################

function getSpasswordElement(index , idName) {
  return document.getElementById('spassword' + index);
}

function getindexElementforALl(index , idName) {
  return document.getElementById(idName + index);
}

function onKeyUpEventforAll(index, event, idName) {
  const eventCode = event.which || event.keyCode;
  if (getindexElementforALl(index , idName).value.length === 1) {
    if (index !== 6) {
      getindexElementforALl(index + 1 , idName).focus();
    } else {
      getindexElementforALl(index, idName).blur();
      // Submit code
      console.log('submit code ');
    }
  }
  if (eventCode === 12 && index !== 1) {
    alert()
    getindexElementforALl(index - 1).focus();
  }
}
function onFocusEventAll(index , idName) {
  for (item = 1; item < index; item++) {
    const currentElement = getindexElementforALl(item , idName);
    if (!currentElement.value) {
      currentElement.focus();
      break;
    }
  }
}

function getUpasswordElement(index) {
  return document.getElementById('upassword' + index);
}

function onKeyUp(index, event) {
  const eventCode = event.which || event.keyCode;
  if (getUpasswordElement(index).value.length === 1) {
    if (index !== 6) {
      getUpasswordElement(index+ 1).focus();
    } else {
      getUpasswordElement(index).blur();
      // Submit code
      console.log('submit code1 ');
    }
  }
  if (eventCode === 12 && index !== 1) {
    getUpasswordElement(index - 1).focus();
  }
}

function getSpasswordElement(index) {
  return document.getElementById('spassword' + index);
}

function onKeyUpEvent(index, event) {
  const eventCode = event.which || event.keyCode;
  if (getSpasswordElement(index).value.length === 1) {
    if (index !== 6) {
      getSpasswordElement(index + 1).focus();
    } else {
      getSpasswordElement(index).blur();
      // Submit code
      console.log('submit code ');
    }
  }
  if (eventCode === 12 && index !== 1) {
    getSpasswordElement(index - 1).focus();
  }
}
function onFocusEvent(index) {
  for (item = 1; item < index; item++) {
    const currentElement = getSpasswordElement(item);
    if (!currentElement.value) {
      currentElement.focus();
      break;
    }
  }
}
function getCpasswordElement(index) {
  return document.getElementById('cpassword' + index);
}

function onKeyUpEvents(index, event) {
  const eventCode = event.which || event.keyCode;
  if (getCpasswordElement(index).value.length === 1) {
    if (index !== 6) {
      getCpasswordElement(index+ 1).focus();
    } else {
      getCpasswordElement(index).blur();
      // Submit code
      console.log('submit code3 ');
    }
  }
  if (eventCode === 12 && index !== 1) {
    getCpasswordElement(index - 1).focus();
  }
}

function onFocus(index) {
  for (item = 1; item < index; item++) {
    const currentElement = getUpasswordElement(item);
    if (!currentElement.value) {
        currentElement.focus();
        break;
    }
  }
}

function onFocusEvents(index) {
  for (item = 1; item < index; item++) {
    const currentElement = getCpasswordElement(item);
    if (!currentElement.value) {
        currentElement.focus();
        break;
    }
  }
}

function boxCarousel2() {
  $('.box-owl1').owlCarousel({
      autoplay: false,
      autoplayTimeout: 3000,
      loop: false,
      autoWidth: true,
      rewind: true,
      nav: true,
      responsive: {
          0: {
              items: 3
          },
          480: {
              items: 3
          },
          640: {
              items: 4
          },
          768: {
              items: 5,
              nav: true,
              // loop:false
          },
          1024: {
              items: 4,
              nav: true,
              // loop:false
          },
          1200: {
              items: 4,
              nav: true,
              // loop:false
          },
          1366: {
              items: 5,
              nav: true,
              // loop:false
          },
          1400: {
              items: 5,
              nav: true,
              // loop:false
          },
          1600: {
              items: 6,
              nav: true,
              // loop:false
          }
      }
  })
}

/* //-- show toast message - Function */
function showToastMessage(messageText, messageType, autoDismiss, dismissDuration) {
  if (messageText == "Product Service Error") messageText = "";
  if (typeof messageType === "undefined" || messageType === null)
    messageType = 'error';
  if (typeof autoDismiss === "undefined" || autoDismiss === null)
    autoDismiss = true;
  if (typeof dismissDuration === "undefined" || dismissDuration === null)
    dismissDuration = 5000;

  var messageHTML = '<div class="msg-toast msg-' + messageType + '"><em>' + messageText + '</em></div>';
  $('body').append('<div class="toast-messages"></div>');
  $('div.toast-messages').html(messageHTML);
  setTimeout(function () {
    $('div.toast-messages').find('.msg-toast').addClass('msg-showing');
  }, 300);
  if (autoDismiss) {
    setTimeout(function () {
      $('div.toast-messages').find('.msg-toast').removeClass('msg-showing');
    }, dismissDuration);
    setTimeout(function () {
      $('div.toast-messages').html('');
    }, dismissDuration + 400);
  } else {
    $('div.toast-messages').find('.msg-toast').addClass('msg-close');
  }
};

// Keyboard
//var openKeybordPress=null;
var keyPressOn = false;

function virtualKeybord(vartualPass, keyBoardDiv, inputTxt) {
  console.log("vartualPass-->" + vartualPass + "  keyBoardDiv--->" + keyBoardDiv);

  $(function () {
    $("#" + vartualPass)
      // apply keyboard
      .keyboard({
        layout: 'custom',
        customLayout: {
          'default': [
            '` 1 2 3 4 5 6 7 8 9 0 - = ',
            'q w e r t y u i o p [ ] \\',
            'a s d f g h j k l ; \'',
            '{shift} z x c v b n m , . / {clear}'
          ],
          'shift': [
            '~ ! @ # $ % ^ & * ( ) _ + ',
            'Q W E R T Y U I O P { } |',
            'A S D F G H J K L : "',
            '{shift} Z X C V B N M < > ? {clear}'
          ]
        },
        display: {
          // this needs to be set otherwise the scramble
          // extension thinks the "C" is another letter
          // to scramble
          'clear': 'Clear'
        },
        visible: function (e, kb) {
          // kb.$keyboard.find(".ui-keyboard-clear").addClass("ui-state-active");
        },
        // keyboard always visible
        alwaysOpen: true,
        ignoreEsc: true,
        stayOpen: true,
        // avoid changing the focus (hardware keyboard probably won't work)
        noFocus: true,
        // disable position utility
        position: '',
        // use original input only
        usePreview: false,
        preventPaste: true, // prevent ctrl-v and right click
        // add keyboard to desired div
        appendTo: "#" + keyBoardDiv,
        change: function (e, keyboard, el) {
          // console.log('keyboard value',e.target.value);

        },
        beforeVisible: function (e, keyboard, el) { },
        beforeClose: function (e, keyboard, el, accepted) { },

        // initialize scramble
        initialized: function (e, keyboard, el) {

          setTimeout(function () {
            keyboard.$keyboard = keyboard.scramble_setup(keyboard.$keyboard);

          }, 0);
        },
        validate: function (keyboard, value, isClosing) {
          return true;
        }
      })
      .addScramble({
        targetKeys: /[a-z\d]/i, // keys to randomize
        byRow: true, // randomize by row, otherwise randomize all keys
        randomizeOnce: false, // if false, randomize every time the keyboard open
      });
    $("#" + inputTxt).val("")
    // $("#"+inputTxt).focus();

  });
  //   return keyPressOn;
  isKeyboardOpen = true;
}


$(document).click(function (e) {
  if (!window.hasOwnProperty('cordova')) {
    // alert("event id-->" + e.target.id)

    if (e.target.id == "pwdKeyboard" || e.target.id ==  'pwd_keyboard') {
      passwordKeyboardInit();
    } else if (e.target.id == "userNameKeyboard") {
      userNameKeyboardInit();
    } 
    else if(e.target.id == "corporateIdKeyboard"){
      corporateIdKeyboardInit();
    }
    else if(e.target.id == "userNameCorporateKeyboard"){
      userNameCorporateKeyboardInit();
    }
    else if(e.target.id == "pwdCorporateKeyboard"){
      passwordCorporateKeyboardInit();
    }
    else if (isKeyboardOpen) {
      closeKeyboards();
    } 
  }
});


function showAndHideKeyBoard() {
  $('nav.global-nav').removeClass('nav-showing');
  $('div.nav-overlay').fadeOut(300);
  // $('body').css('overflow', 'auto');
}

function testInit(){
  
}

function passwordKeyboardInit() {
  var pwdkeyboard = $('#pwd').keyboard().getkeyboard();
  pwdkeyboard.destroy();
  $('#keyBoardDiv').show();
  $('#keyBoardDiv1').hide();
  $('#keyBoardDiv2').hide();
  $('#keyBoardDiv3').hide();
  $('#keyBoardDiv4').hide();
  $('.keyboardoverlay').addClass('active');
  virtualKeybord("pwd", "keyBoardDiv", "pwdTxt");
}

function userNameKeyboardInit() {
  var userNameKeyboard = $('#userName').keyboard().getkeyboard();
  userNameKeyboard.destroy();
  $('#keyBoardDiv1').show();
  $('#keyBoardDiv').hide();
  $('#keyBoardDiv2').hide();
  $('#keyBoardDiv3').hide();
  $('#keyBoardDiv4').hide();
  $('.keyboardoverlay').addClass('active');
  virtualKeybord("userName", "keyBoardDiv1", "userNameTxt");

}
function corporateIdKeyboardInit(){
  var corporateIdKeyboard = $('#corporateId').keyboard().getkeyboard();
  corporateIdKeyboard.destroy();
  $('#keyBoardDiv2').show();
  $('#keyBoardDiv').hide();
  $('#keyBoardDiv1').hide();
  $('#keyBoardDiv3').hide();
  $('#keyBoardDiv4').hide();
  $('.keyboardoverlay').addClass('active');
  virtualKeybord("corporateId", "keyBoardDiv2", "corporateIdTxt");
}

function userNameCorporateKeyboardInit(){
  var usernameCorporateKeyboard = $('#userNameCorporate').keyboard().getkeyboard();
  usernameCorporateKeyboard.destroy();
  $('#keyBoardDiv3').show();
  $('#keyBoardDiv').hide();
  $('#keyBoardDiv1').hide();
  $('#keyBoardDiv2').hide();
  $('#keyBoardDiv4').hide();
  $('.keyboardoverlay').addClass('active');
  virtualKeybord("userNameCorporate", "keyBoardDiv3", "userNameCorporateTxt");
}


function passwordCorporateKeyboardInit(){
  var passwordCorporateKeyboard = $('#pwdCorporate').keyboard().getkeyboard();
  passwordCorporateKeyboard.destroy();
  $('#keyBoardDiv4').show();
  $('#keyBoardDiv').hide();
  $('#keyBoardDiv1').hide();
  $('#keyBoardDiv2').hide();
  $('#keyBoardDiv3').hide();
  $('.keyboardoverlay').addClass('active');
  virtualKeybord("pwdCorporate", "keyBoardDiv4", "pwdCorporateTxt");
}
function closeKeyboards() {
  // var pwdkeyboard = $('#pwd').keyboard().getkeyboard();
  // if (pwdkeyboard) {
  //     pwdkeyboard.destroy();
  // }

  // var userNameKeyboard = $('#userName').keyboard().getkeyboard();
  // if (userNameKeyboard) {
  //     userNameKeyboard.destroy();
  // }
  isKeyboardOpen = false;
  $('.keyboardoverlay').removeClass('active');
  $('#keyBoardDiv').hide();
  $('#keyBoardDiv1').hide();
  $('#keyBoardDiv2').hide();
  $('#keyBoardDiv3').hide();
  $('#keyBoardDiv4').hide();
}

stickFooter();
// footer hide in devices on keyboard active start
function stickFooter() {
  var _originalSize = $(window).width() + $(window).height();
  $(window).on('resize', function () {

    // checkNavMenu();

    if ($(window).width() + $(window).height() != _originalSize) {
      console.log("keyboard active");
      $(".footer-container").removeClass("sticky-actions");
    } else {
      console.log("keyboard closed");
      $(".footer-container").addClass("sticky-actions");
    }
  });
}
// footer hide in devices on keyboard active end


  // hidePopupIfKeyboardOpens();
  function hidePopupIfKeyboardOpens() {
    var _originalSize = $(window).width() + $(window).height();
    $(window).resize(function () {
      if ($(window).width() + $(window).height() != _originalSize) {
        console.log("keyboard show up");
        $('.focusCloseable').removeClass('popup-active');
      } else {
        console.log("keyboard closed");
        $('.focusCloseable').addClass('popup-active')
      }
    });
  }