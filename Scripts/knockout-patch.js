/// <reference path="knockout-patch.d.ts" />
/// <reference path="jquery-2.0.3.d.ts" />
ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function (element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        $(element).stop(true);
        ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).hide();
    }
};
ko.bindingHandlers.as_panel = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        var unwrapped = ko.utils.unwrapObservable(value);
        if (!unwrapped.templateConfiguration) {
            throw new Error('as_panel binding can only be used with a Panel or child of.');
        }
        return ko.bindingHandlers['template'].init(element, function () { return unwrapped.templateConfiguration; }, null, null, null);
        //element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = valueAccessor();
        var unwrapped = ko.utils.unwrapObservable(value);
        return ko.bindingHandlers['template'].update(element, function () { return unwrapped.templateConfiguration; }, allBindingsAccessor, viewModel, bindingContext);
    }
};
ko.virtualElements.allowedBindings['as_panel'] = true;
ko.bindingHandlers.as_placeholder = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = valueAccessor();
        var ret = ko.bindingHandlers['attr'].update(element, function () { return { placeholder: value }; }, allBindingsAccessor, viewModel, bindingContext);
        if (!($(element).data('placeholder'))) {
            $(element).data('placeholder', $(element).placeholder());
        }
        return ret;
    }
};
ko.extenders.numeric = function (target, precision) {
    //create a writeable computed observable to intercept writes to our observable
    var result = ko.computed({
        read: target,
        write: function (newValue) {
            var current = target(), roundingMultiplier = Math.pow(10, precision), newValueAsNum = isNaN(newValue) ? 0 : parseFloat(newValue), valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
            //only write if it changed
            if (valueToWrite !== current) {
                target(valueToWrite);
            }
            else {
                //if the rounded value is the same, but a different value was written, force a notification for the current field
                if (newValue !== current) {
                    target.notifySubscribers(valueToWrite);
                }
            }
        }
    }).extend({ notify: 'always' });
    //initialize with current value to make sure it is rounded appropriately
    result(target());
    //return the new computed observable
    return result;
};
ko.extenders.currency = function (target, precision) {
    //create a writeable computed observable to intercept writes to our observable
    var result = ko.computed({
        read: target,
        write: function (newValue) {
            var current = target();
            var roundingMultiplier = Math.pow(10, precision);
            var newValueAsString = "" + newValue;
            // Strip the leading character if it is not numeric.
            var newValueWithoutLeadingChar = newValueAsString.replace(/^\D?/, '');
            var newValueAsNum = parseFloat(newValueWithoutLeadingChar);
            if (newValueAsNum == NaN) {
                newValueAsNum = 0;
            }
            var valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
            // Fix this up more later ...
            //only write if it changed
            if (valueToWrite !== current) {
                target(valueToWrite);
            }
            else {
                //if the rounded value is the same, but a different value was written, force a notification for the current field
                if (newValue !== current) {
                    target.notifySubscribers(valueToWrite);
                }
            }
        }
    }).extend({ notify: 'always' });
    //initialize with current value to make sure it is rounded appropriately
    result(target());
    //return the new computed observable
    return result;
};
/* TONG : This is so that we can pass object around without going through the ko.stringify serialization  */
ko.postbox.publishEx = function (topic, value) {
    var exports = ko.postbox;
    if (topic) {
        //keep the value and a serialized version for comparison
        exports.topicCache[topic] = {
            value: value,
            serialized: "The value for topic " + topic + " is not serialized"
        };
        exports.notifySubscribers(value, topic);
    }
};
//This function is extracted from http://stackoverflow.com/questions/275931/how-do-you-make-an-element-flash-in-jquery
jQuery.fn.flash = function (color, duration) {
    var current = this.css('color');
    this.animate({ color: 'rgb(' + color + ')' }, duration / 2);
    this.animate({ color: current }, duration / 2);
};
