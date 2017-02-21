"use strict";
var GADimensionsAndMetricsOrganizer = (function () {
    function GADimensionsAndMetricsOrganizer(standardDimensionsAndMetrics, customDimensionsAndMetrics, transpilationDefinition) {
        this.vars = [];
        this.groups = [];
        this.groupNames = [];
        this.mandatoryDimensions = [];
        this.mandatoryMetrics = [];
        this.standardDimensionsAndMetrics = standardDimensionsAndMetrics;
        this.customDimensionsAndMetrics = customDimensionsAndMetrics;
        this.transpilationDefinition = transpilationDefinition;
    }
    GADimensionsAndMetricsOrganizer.prototype.SetupGroupsAndVars = function () {
        var promise = new Parse.Promise();
        var promises = [
            this.standardDimensionsAndMetrics.GetVariables(),
            this.customDimensionsAndMetrics.GetVariables()
        ];
        Parse.Promise.when(promises)
            .then(function (results) {
            var standard = results[0], custom = results[1];
            for (var i = 0; i < standard.items.length; i++) {
                var v = standard.items[i];
                if (!v.attributes)
                    continue;
                if (v.attributes.group.indexOf('DoubleClick') != -1)
                    continue;
                if (v.attributes.status !== "PUBLIC")
                    continue;
                if (!!v.attributes.calculation)
                    continue;
                if (!!v.attributes.type && v.attributes.type == "METRIC" && !!v.attributes.dataType && v.attributes.dataType == "PERCENT")
                    continue;
                if (!this.groups[v.attributes.group]) {
                    this.groups[v.attributes.group] = {};
                    this.groupNames.push(v.attributes.group);
                }
                if (!this.groups[v.attributes.group][v.attributes.type]) {
                    this.groups[v.attributes.group][v.attributes.type] = [];
                }
                if (v.id.indexOf('ga:goalXX') == 0) {
                    for (var j = 0; j < custom.goals.length; j++) {
                        var goal = custom.goals[j];
                        var item = {
                            id: v.id.replace('XX', this.leftpad(goal.id, 2, '0')),
                            attr: {
                                type: v.attributes.type,
                                dataType: v.attributes.dataType,
                                group: v.attributes.group,
                                status: v.attributes.status,
                                uiName: v.attributes.uiName.replace('XX', '').replace('  ', ' ') + ' "' + goal.name + '"',
                                description: v.attributes.description,
                                allowedInSegments: v.attributes.allowedInSegments,
                                addedInApiVersion: v.attributes.addedInApiVersion
                            }
                        };
                        this.groups[v.attributes.group][v.attributes.type].push(item);
                        this.vars[item.id] = item.attr;
                    }
                }
                else if (v.id.indexOf('ga:dimensionXX') == 0) {
                    for (var j = 0; j < custom.dimensions.length; j++) {
                        var customDimension = custom.dimensions[j];
                        var item = {
                            id: customDimension.id,
                            attr: {
                                type: v.attributes.type,
                                dataType: v.attributes.dataType,
                                group: v.attributes.group,
                                status: v.attributes.status,
                                uiName: v.attributes.uiName.replace('XX', '').replace('  ', ' ') + ' "' + customDimension.name + '"',
                                description: v.attributes.description,
                                allowedInSegments: v.attributes.allowedInSegments,
                                addedInApiVersion: v.attributes.addedInApiVersion
                            }
                        };
                        this.groups[v.attributes.group][v.attributes.type].push(item);
                        this.vars[item.id] = item.attr;
                    }
                }
                else if (v.id.indexOf('ga:metricXX') == 0) {
                    for (var j = 0; j < custom.metrics.length; j++) {
                        var customMetric = custom.metrics[j];
                        var item = {
                            id: customMetric.id,
                            attr: {
                                type: v.attributes.type,
                                dataType: v.attributes.dataType,
                                group: v.attributes.group,
                                status: v.attributes.status,
                                uiName: v.attributes.uiName.replace('XX', '').replace('  ', ' ') + ' "' + customMetric.name + '"',
                                description: v.attributes.description,
                                allowedInSegments: v.attributes.allowedInSegments,
                                addedInApiVersion: v.attributes.addedInApiVersion
                            }
                        };
                        this.groups[v.attributes.group][v.attributes.type].push(item);
                        this.vars[item.id] = item.attr;
                    }
                }
                else if (/ga\:[\w]+XX[\w]*/.test(v.id)) {
                }
                else if (!!this.transpilationDefinition.columns[v.id]) {
                    var item = {
                        id: v.id,
                        attr: {
                            type: v.attributes.type,
                            dataType: v.attributes.dataType,
                            group: v.attributes.group,
                            status: v.attributes.status,
                            uiName: v.attributes.uiName,
                            description: v.attributes.description,
                            allowedInSegments: v.attributes.allowedInSegments,
                            addedInApiVersion: v.attributes.addedInApiVersion,
                            mandatory: this.transpilationDefinition.columns[v.id].mandatory
                        }
                    };
                    this.groups[v.attributes.group][v.attributes.type].push(item);
                    this.vars[v.id] = item.attr;
                }
            }
            try {
                for (var column in this.transpilationDefinition.columns) {
                    var v = this.vars[column];
                    if (!v)
                        continue;
                    v.mandatory = this.transpilationDefinition.columns[column].mandatory;
                    if (v.mandatory) {
                        if (v.type == 'DIMENSION')
                            this.mandatoryDimensions.push(column);
                        else
                            this.mandatoryMetrics.push(column);
                    }
                }
            }
            catch (e) {
                console.warn(e);
            }
            promise.resolve(this);
        }.bind(this));
        return promise;
    };
    GADimensionsAndMetricsOrganizer.prototype.GetVariable = function (name) {
        return this.vars[name];
    };
    GADimensionsAndMetricsOrganizer.prototype.leftpad = function (str, len, ch) {
        str = String(str);
        var i = -1;
        if (!ch && ch !== 0)
            ch = ' ';
        len = len - str.length;
        while (++i < len) {
            str = ch + str;
        }
        return str;
    };
    return GADimensionsAndMetricsOrganizer;
}());
module.exports = GADimensionsAndMetricsOrganizer;
//# sourceMappingURL=GADimensionsAndMetricsOrganizer.js.map