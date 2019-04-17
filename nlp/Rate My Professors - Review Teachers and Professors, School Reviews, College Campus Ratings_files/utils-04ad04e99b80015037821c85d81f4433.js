function searchFilterClickEvent() {
  mtvn.btg.Controller.sendLinkEvent({
    linkName: 'SEARCH:Filter',
    linkType: 'o'
  });
}

function promoClickEvent() {
  var promoid = $('.promotion #promoid').html();
  var linkname = 'PROMOS:Click_' + promoid;
  mtvn.btg.Controller.sendLinkEvent({ linkName: linkname, linkType: 'o' });
}

function showDependentQuestion(id, className) {
  $("div[class*='" + id + "-'").hide();
  $('.' + className).show();
}

function validateGraduationYear(className) {
  if ($('#crYearGraduating').val() != '') {
    $('.grade')
      .closest('.form-element')
      .removeClass('error');
  }
}

function clearDepartmentDropDown() {
  if ($('#searchProfessorSchool').val() == '') {
    $('#homeGrid #searchProfessorDepartment').html('<option>select</option>');
    $('.sod_select .sod_label').html('<span class="sod_label">select</span>');
    $('.sod_list_wrapper .sod_list').html(
      '<span class="sod_option  selected active " title="select" data-value="select">select</span>'
    );
  }
}

if ($('body.utility_terms').length) {
  $location = location.hash;

  $('#termUsePage').on('click', function(e) {
    $('.trigger-use').click();
    $location = 'use';
  });

  $('#privacyPage').on('click', function(e) {
    $('.trigger-privacy').click();
    $location = 'privacy';
  });

  $('#copyRightPage').on('click', function(e) {
    $('.trigger-copyright').click();
    $location = 'copyright';
  });
}

$('#mobile_termUsePage').on('click', function(e) {
  location.hash = 'use';
  location.reload();
});

$('#mobile_privacyPage').on('click', function(e) {
  location.hash = 'privacy';
  location.reload();
});

$('#mobile_copyRightPage').on('click', function(e) {
  location.hash = 'copyright';
  location.reload();
});

$('#resendStudentMail').on('click', function(e) {
  $('#resendMailId').val($('#email').val());
  window.location.replace(
    '/people/resendStudentMail?resendMailId=' + $('#email').val()
  );
});

function hideErrorMessage() {
  $('#invalidTIDError').hide();
  $('#yourname-required').hide();
}

