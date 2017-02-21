"use strict";
var Parse = require("parse");
var GADimensionsAndMetricsTranspiler = (function () {
    function GADimensionsAndMetricsTranspiler(organizer) {
        this.organizer = organizer;
    }
    GADimensionsAndMetricsTranspiler.prototype.Transpile = function (selectedDimensionsAndMetrics) {
        var outputDimensions = [];
        var outputMetrics = [];
        var transColumns = this.organizer.transpilationDefinition.columns;
        try {
            for (var i = 0; i < selectedDimensionsAndMetrics.dimensions.length; i++) {
                try {
                    var dimension = selectedDimensionsAndMetrics.dimensions[i];
                    var pretransformDefinition = transColumns[dimension];
                    var columnDefinition = this.applyTranspilationTemplate(dimension, pretransformDefinition);
                    outputDimensions.push(columnDefinition);
                }
                catch (e) {
                    var test = e;
                }
            }
            for (var i = 0; i < selectedDimensionsAndMetrics.metrics.length; i++) {
                try {
                    var metric = selectedDimensionsAndMetrics.metrics[i];
                    var pretransformDefinition = transColumns[metric];
                    var columnDefinition = this.applyTranspilationTemplate(metric, pretransformDefinition);
                    outputMetrics.push(columnDefinition);
                }
                catch (e) {
                    var test = e;
                }
            }
        }
        catch (e) {
            var test = e;
        }
        return {
            dimensions: outputDimensions,
            metrics: outputMetrics
        };
    };
    GADimensionsAndMetricsTranspiler.prototype.applyTranspilationTemplate = function (variable, pretransformDefinition) {
        var transTemplates = this.organizer.transpilationDefinition.templates;
        var template = JSON.stringify(transTemplates[pretransformDefinition.template]);
        var attributes = this.organizer.GetVariable(variable);
        var transformedTemplate = template.replace('#varName#', variable);
        for (var name in attributes) {
            transformedTemplate = transformedTemplate.replace('#' + name + '#', attributes[name]);
        }
        return JSON.parse(transformedTemplate);
    };
    GADimensionsAndMetricsTranspiler.prototype.getTranspilations = function () {
        var promise = new Parse.Promise();
        Parse.Cloud.run('getTranspilations')
            .then(function (transpilations) {
            promise.resolve(transpilations);
        }.bind(this));
        return promise;
    };
    return GADimensionsAndMetricsTranspiler;
}());
module.exports = GADimensionsAndMetricsTranspiler;
//# sourceMappingURL=GADimensionsAndMetricsTranspiler.js.map