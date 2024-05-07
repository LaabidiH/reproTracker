function SmartWizard(target, options) {
    this.target = target;
    this.options = options;
    this.curStepIdx = options.selected;
    this.steps = $(target).children("ul").children("li").children("a"); // Get all anchors
    this.contentWidth = 0;
    this.msgBox = $('<div class="msgBox"><div class="content"></div><a href="#" class="close">X</a></div>');
    this.elmStepContainer = $('<div></div>').addClass("stepContainer");
    this.loader = $('<div>Loading</div>').addClass("loader");
    this.buttons = {
        next: $('<a>' + options.labelNext + '</a>').attr("href", "#").addClass("buttonNext"),
        previous: $('<a>' + options.labelPrevious + '</a>').attr("href", "#").addClass("buttonPrevious"),
        finish: $('<a>' + options.labelFinish + '</a>').attr("href", "#").addClass("buttonFinish")
    };

    /*
     * Private functions
     */

    var _init = function ($this) {
        var elmActionBar = $('<div></div>').addClass("actionBar");
        elmActionBar.append($this.msgBox);
        $('.close', $this.msgBox).click(function () {
            $this.msgBox.fadeOut("normal");
            return false;
        });

        var allDivs = $this.target.children('div');
        $this.target.children('ul').addClass("anchor");
        allDivs.addClass("content");

        // highlight steps with errors
        if ($this.options.errorSteps && $this.options.errorSteps.length > 0) {
            $.each($this.options.errorSteps, function (i, n) {
                $this.setError({ stepnum: n, iserror: true });
            });
        }

        $this.elmStepContainer.append(allDivs);
        elmActionBar.append($this.loader);
        $this.target.append($this.elmStepContainer);
        elmActionBar.append($this.buttons.finish)
            .append($this.buttons.next)
            .append($this.buttons.previous);
        $this.target.append(elmActionBar);
        this.contentWidth = $this.elmStepContainer.width();

        $($this.buttons.next).click(function () {
            $this.goForward();
            return false;
        });
        $($this.buttons.previous).click(function () {
            $this.goBackward();
            return false;
        });
        $($this.buttons.finish).click(function () {
            if (!$(this).hasClass('buttonDisabled')) {
                var enquete_data = {
                    cin: $('#cin').val(),
                    prenom: $('#prenom').val(), 
                    nom: $('#nom').val(), 
                    dateNaissance: $('#date_naissance').val(), 
                    genre: $('input[name="genre"]:checked').val(), 
                    nationnalite: $('select[name="nationnalite"]').val(), 
                    adresse: $('#adresse').val(), 
                    ville: $('select[name="ville"]').val(), 
                    metier: $('select[name="metier"]').val(),
                    etatCivil: $('select[name="etat_civil"]').val(), 

                    planification: $('input[name="planification"]:checked').val(),
                    methode: $('#methode').val(),
                    envi_enfant: $('input[name="enfant"]:checked').val(),
                    nombre_enfant: $('#nombre_enfant').val(),
                    nombre_enfant_planifie: $('#nombre_enfant_planifie').val(),
                    nombre_enfant_non_planifie: $('#nombre_enfant_non_planifie').val(),
                    fausse_couche: $('#fausse_couche').val(),
                    fausse_couche_intentionnelle: $('#fausse_couche_intentionnelle').val(),
                    enfant_hors_mariage: $('#enfant_hors_mariage').val(),

                    conscience: $('input[name="conscience"]:checked').val(), 
                    motCleConscience: $('#mot_cle_conscience').val(), 
                    utilisation: $('input[name="utilisation"]:checked').val(), 
                    motCleUtilisation: $('#mot_cle_utilisation').val(), 

                    vih: $('input[name="vih"]:checked').val(), 
                    syphilis: $('input[name="syphilis"]:checked').val(), 
                    trichomonase: $('input[name="trichomonase"]:checked').val(), 
                    gonorrhee: $('input[name="gonorrhee"]:checked').val(), 
                    chlamydia: $('input[name="chlamydia"]:checked').val(), 
                    hepatiteB: $('input[name="hepatite_b"]:checked').val(), 
                    hsv2: $('input[name="hsv_2"]:checked').val(), 
                    hpv: $('input[name="hpv"]:checked').val(), 
                    ist: $('#IST').val(),
                    
                    servicePrenatal: $('input[name="service_prenatal"]:checked').val(),
                    complicationGrosse: $('input[name="complication_grosse"]:checked').val(),
                    motsClesComplicationsGrosses: $('#complications_grosses').val(),
                    complicationAccouchement: $('input[name="complication_accouchement"]:checked').val(),
                    motsClesComplicationsAccouchements: $('#complications_accouchements').val(),
                    serviceMaternel: $('input[name="service_maternel"]:checked').val(),
                    methodeAccouchement: $('#methode_accouchement').val(),
                    
                    violencesSexuelles: $('#violences_sexuelles').val(),
                    agressionsSexuelles: $('#agressions_sexuelles').val(),
                    viols: $('#viols').val(),
                    harcelementSexuel: $('select[name="harcelement_sexuel"]').val(),
                    nbr_harcel_sex: $('#nbr_harcel_sex').val(),
                    santeMentale: $('input[name="sante_mentale"]:checked').val(),

                    verificationSR: $('#verification_sr').val(),
                    serviceExamen: $('input[name="service_examen"]:checked').val(),
                    problemeSexuel: $('#probleme_sexuel').val(),
                    satisfactionSexuelle: $('select[name="satisfaction_sexuelle"]').val(),
                    demandeSoutien: $('input[name="demande_soutien"]:checked').val(),

                    religion: $('select[name="religion"]').val(),
                    niveauEtudes: $('select[name="niveau_etudes"]').val(),
                    revenu: $('#revenu').val(),
                    niveauSocial: $('select[name="niveau_social"]').val(),
                    normeCulturelle: $('select[name="norme_culturelle"]').val(),
                    normeReligieuse: $('select[name="norme_religieuse"]').val(),

                    doctorant: $('#doctorant').val(),
                    anneeRealisation: $('#annee_realisation').val(),
                    enquete: $('#enquete').val()
                };

        
                // if (prenom.trim() === '' || nom.trim() === '' || dateNaissance.trim() === '' || genre === undefined || nationnalite === null 
                //     || adresse.trim() === '' || ville === null || metier === null || etatCivil === null || conscience === undefined || motCleConscience.trim() === ''
                //     || utilisation === undefined || motCleUtilisation.trim() === '' || vih === undefined || syphilis === undefined || trichomonase === undefined 
                //     || gonorrhee === undefined || chlamydia === undefined || hepatiteB === undefined || hsv2 === undefined || hpv === undefined || ist.trim() === ''
                //     || violencesSexuelles.trim() === '' || agressionsSexuelles.trim() === '' || viols.trim() === '' || harcelementSexuel === undefined || santeMentale === undefined
                //     || verificationSR.trim() === '' || serviceExamen === undefined || problemeSexuel.trim() === '' || satisfactionSexuelle === null || demandeSoutien === undefined
                //     || religion === null || niveauEtudes === null || revenu.trim() === '' || niveauSocial === null || normeCulturelle === null || normeReligieuse === null
                //     || doctorant.trim() === '' || anneeRealisation.trim() === '' || enquete.trim() === ''
                //     || servicePrenatal === undefined || complicationGrosse === undefined 
                //     || motsClesComplicationsGrosses.trim() === '' || complicationAccouchement === undefined 
                //     || motsClesComplicationsAccouchements.trim() === '' || serviceMaternel === undefined || methodeAccouchement.trim() === ''
                //     )
                //      {

                //     alert("Veuillez remplir tous les champs.");
                //     return false;
                // }

                // Obtenez le jeton CSRF à partir des cookies
                function getCookie(name) {
                    var cookieValue = null;
                    if (document.cookie && document.cookie !== '') {
                        var cookies = document.cookie.split(';');
                        for (var i = 0; i < cookies.length; i++) {
                            var cookie = cookies[i].trim();
                            // Recherchez le jeton CSRF
                            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }

                // Ajoutez le jeton CSRF à vos en-têtes de requête AJAX
                $.ajaxSetup({
                    beforeSend: function (xhr, settings) {
                        if (!this.crossDomain) {
                            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                        }
                    }
                });

                // Votre code AJAX modifié
                $.ajax({
                    url: '/enquete_soumis/',
                    type: 'POST',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    data: enquete_data,
                    success: function (response) {
                        alert('Formulaire soumis avec succés');
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });
                




                if ($.isFunction($this.options.onFinish)) {
                    var context = { fromStep: $this.curStepIdx + 1 };
                    if (!$this.options.onFinish.call(this, $($this.steps), context)) {
                        return false;
                    }
                } else {
                    var frm = $this.target.parents('form');
                    if (frm && frm.length) {
                        frm.submit();
                    }
                }
            }

            return false;
        });


        $($this.steps).bind("click", function (e) {
            if ($this.steps.index(this) == $this.curStepIdx) {
                return false;
            }
            var nextStepIdx = $this.steps.index(this);
            var isDone = $this.steps.eq(nextStepIdx).attr("isDone") - 0;
            if (isDone == 1) {
                _loadContent($this, nextStepIdx);
            }
            return false;
        });

        // Enable keyboard navigation
        if ($this.options.keyNavigation) {
            $(document).keyup(function (e) {
                if (e.which == 39) { // Right Arrow
                    $this.goForward();
                } else if (e.which == 37) { // Left Arrow
                    $this.goBackward();
                }
            });
        }
        //  Prepare the steps
        _prepareSteps($this);
        // Show the first slected step
        _loadContent($this, $this.curStepIdx);
    };

    var _prepareSteps = function ($this) {
        if (!$this.options.enableAllSteps) {
            $($this.steps, $this.target).removeClass("selected").removeClass("done").addClass("disabled");
            $($this.steps, $this.target).attr("isDone", 0);
        } else {
            $($this.steps, $this.target).removeClass("selected").removeClass("disabled").addClass("done");
            $($this.steps, $this.target).attr("isDone", 1);
        }

        $($this.steps, $this.target).each(function (i) {
            $($(this).attr("href").replace(/^.+#/, '#'), $this.target).hide();
            $(this).attr("rel", i + 1);
        });
    };

    var _step = function ($this, selStep) {
        return $(
            $(selStep, $this.target).attr("href").replace(/^.+#/, '#'),
            $this.target
        );
    };

    var _loadContent = function ($this, stepIdx) {
        var selStep = $this.steps.eq(stepIdx);
        var ajaxurl = $this.options.contentURL;
        var ajaxurl_data = $this.options.contentURLData;
        var hasContent = selStep.data('hasContent');
        var stepNum = stepIdx + 1;
        if (ajaxurl && ajaxurl.length > 0) {
            if ($this.options.contentCache && hasContent) {
                _showStep($this, stepIdx);
            } else {
                var ajax_args = {
                    url: ajaxurl,
                    type: "POST",
                    data: ({ step_number: stepNum }),
                    dataType: "text",
                    beforeSend: function () {
                        $this.loader.show();
                    },
                    error: function () {
                        $this.loader.hide();
                    },
                    success: function (res) {
                        $this.loader.hide();
                        if (res && res.length > 0) {
                            selStep.data('hasContent', true);
                            _step($this, selStep).html(res);
                            _showStep($this, stepIdx);
                        }
                    }
                };
                if (ajaxurl_data) {
                    ajax_args = $.extend(ajax_args, ajaxurl_data(stepNum));
                }
                $.ajax(ajax_args);
            }
        } else {
            _showStep($this, stepIdx);
        }
    };

    var _showStep = function ($this, stepIdx) {
        var selStep = $this.steps.eq(stepIdx);
        var curStep = $this.steps.eq($this.curStepIdx);
        if (stepIdx != $this.curStepIdx) {
            if ($.isFunction($this.options.onLeaveStep)) {
                var context = { fromStep: $this.curStepIdx + 1, toStep: stepIdx + 1 };
                if (!$this.options.onLeaveStep.call($this, $(curStep), context)) {
                    return false;
                }
            }
        }
        $this.elmStepContainer.height(_step($this, selStep).outerHeight());
        var prevCurStepIdx = $this.curStepIdx;
        $this.curStepIdx = stepIdx;
        if ($this.options.transitionEffect == 'slide') {
            _step($this, curStep).slideUp("fast", function (e) {
                _step($this, selStep).slideDown("fast");
                _setupStep($this, curStep, selStep);
            });
        } else if ($this.options.transitionEffect == 'fade') {
            _step($this, curStep).fadeOut("fast", function (e) {
                _step($this, selStep).fadeIn("fast");
                _setupStep($this, curStep, selStep);
            });
        } else if ($this.options.transitionEffect == 'slideleft') {
            var nextElmLeft = 0;
            var nextElmLeft1 = null;
            var nextElmLeft = null;
            var curElementLeft = 0;
            if (stepIdx > prevCurStepIdx) {
                nextElmLeft1 = $this.contentWidth + 10;
                nextElmLeft2 = 0;
                curElementLeft = 0 - _step($this, curStep).outerWidth();
            } else {
                nextElmLeft1 = 0 - _step($this, selStep).outerWidth() + 20;
                nextElmLeft2 = 0;
                curElementLeft = 10 + _step($this, curStep).outerWidth();
            }
            if (stepIdx == prevCurStepIdx) {
                nextElmLeft1 = $($(selStep, $this.target).attr("href"), $this.target).outerWidth() + 20;
                nextElmLeft2 = 0;
                curElementLeft = 0 - $($(curStep, $this.target).attr("href"), $this.target).outerWidth();
            } else {
                $($(curStep, $this.target).attr("href"), $this.target).animate({ left: curElementLeft }, "fast", function (e) {
                    $($(curStep, $this.target).attr("href"), $this.target).hide();
                });
            }

            _step($this, selStep).css("left", nextElmLeft1).show().animate({ left: nextElmLeft2 }, "fast", function (e) {
                _setupStep($this, curStep, selStep);
            });
        } else {
            _step($this, curStep).hide();
            _step($this, selStep).show();
            _setupStep($this, curStep, selStep);
        }
        return true;
    };

    var _setupStep = function ($this, curStep, selStep) {
        $(curStep, $this.target).removeClass("selected");
        $(curStep, $this.target).addClass("done");

        $(selStep, $this.target).removeClass("disabled");
        $(selStep, $this.target).removeClass("done");
        $(selStep, $this.target).addClass("selected");

        $(selStep, $this.target).attr("isDone", 1);

        _adjustButton($this);

        if ($.isFunction($this.options.onShowStep)) {
            var context = { fromStep: parseInt($(curStep).attr('rel')), toStep: parseInt($(selStep).attr('rel')) };
            if (!$this.options.onShowStep.call(this, $(selStep), context)) {
                return false;
            }
        }
        if ($this.options.noForwardJumping) {
            // +2 == +1 (for index to step num) +1 (for next step)
            for (var i = $this.curStepIdx + 2; i <= $this.steps.length; i++) {
                $this.disableStep(i);
            }
        }
    };

    var _adjustButton = function ($this) {
        if (!$this.options.cycleSteps) {
            if (0 >= $this.curStepIdx) {
                $($this.buttons.previous).addClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.previous).hide();
                }
            } else {
                $($this.buttons.previous).removeClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.previous).show();
                }
            }
            if (($this.steps.length - 1) <= $this.curStepIdx) {
                $($this.buttons.next).addClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.next).hide();
                }
            } else {
                $($this.buttons.next).removeClass("buttonDisabled");
                if ($this.options.hideButtonsOnDisabled) {
                    $($this.buttons.next).show();
                }
            }
        }
        // Finish Button
        if (!$this.steps.hasClass('disabled') || $this.options.enableFinishButton) {
            $($this.buttons.finish).removeClass("buttonDisabled");
            if ($this.options.hideButtonsOnDisabled) {
                $($this.buttons.finish).show();
            }
        } else {
            $($this.buttons.finish).addClass("buttonDisabled");
            if ($this.options.hideButtonsOnDisabled) {
                $($this.buttons.finish).hide();
            }
        }
    };

    /*
     * Public methods
     */

    SmartWizard.prototype.goForward = function () {
        var nextStepIdx = this.curStepIdx + 1;
        if (this.steps.length <= nextStepIdx) {
            if (!this.options.cycleSteps) {
                return false;
            }
            nextStepIdx = 0;
        }
        _loadContent(this, nextStepIdx);
    };

    SmartWizard.prototype.goBackward = function () {
        var nextStepIdx = this.curStepIdx - 1;
        if (0 > nextStepIdx) {
            if (!this.options.cycleSteps) {
                return false;
            }
            nextStepIdx = this.steps.length - 1;
        }
        _loadContent(this, nextStepIdx);
    };

    SmartWizard.prototype.goToStep = function (stepNum) {
        var stepIdx = stepNum - 1;
        if (stepIdx >= 0 && stepIdx < this.steps.length) {
            _loadContent(this, stepIdx);
        }
    };
    SmartWizard.prototype.enableStep = function (stepNum) {
        var stepIdx = stepNum - 1;
        if (stepIdx == this.curStepIdx || stepIdx < 0 || stepIdx >= this.steps.length) {
            return false;
        }
        var step = this.steps.eq(stepIdx);
        $(step, this.target).attr("isDone", 1);
        $(step, this.target).removeClass("disabled").removeClass("selected").addClass("done");
    }
    SmartWizard.prototype.disableStep = function (stepNum) {
        var stepIdx = stepNum - 1;
        if (stepIdx == this.curStepIdx || stepIdx < 0 || stepIdx >= this.steps.length) {
            return false;
        }
        var step = this.steps.eq(stepIdx);
        $(step, this.target).attr("isDone", 0);
        $(step, this.target).removeClass("done").removeClass("selected").addClass("disabled");
    }
    SmartWizard.prototype.currentStep = function () {
        return this.curStepIdx + 1;
    }

    SmartWizard.prototype.showMessage = function (msg) {
        $('.content', this.msgBox).html(msg);
        this.msgBox.show();
    }
    SmartWizard.prototype.hideMessage = function () {
        this.msgBox.fadeOut("normal");
    }
    SmartWizard.prototype.showError = function (stepnum) {
        this.setError(stepnum, true);
    }
    SmartWizard.prototype.hideError = function (stepnum) {
        this.setError(stepnum, false);
    }
    SmartWizard.prototype.setError = function (stepnum, iserror) {
        if (typeof stepnum == "object") {
            iserror = stepnum.iserror;
            stepnum = stepnum.stepnum;
        }

        if (iserror) {
            $(this.steps.eq(stepnum - 1), this.target).addClass('error')
        } else {
            $(this.steps.eq(stepnum - 1), this.target).removeClass("error");
        }
    }

    SmartWizard.prototype.fixHeight = function () {
        var height = 0;

        var selStep = this.steps.eq(this.curStepIdx);
        var stepContainer = _step(this, selStep);
        stepContainer.children().each(function () {
            height += $(this).outerHeight();
        });

        // These values (5 and 20) are experimentally chosen.
        stepContainer.height(height + 5);
        this.elmStepContainer.height(height + 20);
    }

    _init(this);
};



(function ($) {

    $.fn.smartWizard = function (method) {
        var args = arguments;
        var rv = undefined;
        var allObjs = this.each(function () {
            var wiz = $(this).data('smartWizard');
            if (typeof method == 'object' || !method || !wiz) {
                var options = $.extend({}, $.fn.smartWizard.defaults, method || {});
                if (!wiz) {
                    wiz = new SmartWizard($(this), options);
                    $(this).data('smartWizard', wiz);
                }
            } else {
                if (typeof SmartWizard.prototype[method] == "function") {
                    rv = SmartWizard.prototype[method].apply(wiz, Array.prototype.slice.call(args, 1));
                    return rv;
                } else {
                    $.error('Method ' + method + ' does not exist on jQuery.smartWizard');
                }
            }
        });
        if (rv === undefined) {
            return allObjs;
        } else {
            return rv;
        }
    };

    // Default Properties and Events
    $.fn.smartWizard.defaults = {
        selected: 0,  // Selected Step, 0 = first step
        keyNavigation: true, // Enable/Disable key navigation(left and right keys are used if enabled)
        enableAllSteps: false,
        transitionEffect: 'fade', // Effect on navigation, none/fade/slide/slideleft
        contentURL: null, // content url, Enables Ajax content loading
        contentCache: true, // cache step contents, if false content is fetched always from ajax url
        cycleSteps: false, // cycle step navigation
        enableFinishButton: false, // make finish button enabled always
        hideButtonsOnDisabled: false, // when the previous/next/finish buttons are disabled, hide them instead?
        errorSteps: [],    // Array Steps with errors
        labelNext: 'Next',
        labelPrevious: 'Previous',
        labelFinish: 'Finish',
        noForwardJumping: false,
        onLeaveStep: null, // triggers when leaving a step
        onShowStep: null,  // triggers when showing a step
        onFinish: null  // triggers when Finish button is clicked
    };

})(jQuery);