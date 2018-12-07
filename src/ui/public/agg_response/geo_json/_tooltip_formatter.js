import $ from 'jquery';
import _ from 'lodash';
import { RegistryFieldFormatsProvider } from 'ui/registry/field_formats';

export function TileMapTooltipFormatterProvider($compile, $rootScope, Private) {

  const fieldFormats = Private(RegistryFieldFormatsProvider);
  const $tooltipScope = $rootScope.$new();
  const $el = $('<div>').html(require('ui/agg_response/geo_json/_tooltip.html'));
  $compile($el)($tooltipScope);

  return function tooltipFormatter(feature) {
    if (!feature) return '';

    const value = feature.properties.value;
    const acr = feature.properties.aggConfigResult;
    const vis = acr.aggConfig.vis;

    const metricAgg = acr.aggConfig;
    let geoFormat = _.get(vis.getAggConfig(), 'byTypeName.geohash_grid[0].format');
    if (!geoFormat) geoFormat = fieldFormats.getDefaultInstance('geo_point');
//editado por Edmar Moretti
/*
    $tooltipScope.details = [
      {
        label: metricAgg.makeLabel(),
        value: metricAgg.fieldFormatter()(value)
      },
      {
        label: 'Latitude',
        value: feature.geometry.coordinates[1]
      },
      {
        label: 'Longitude',
        value: feature.geometry.coordinates[0]
      }
    ];
*/
    $tooltipScope.details = [
      {
        label: metricAgg.makeLabel(),
        value: metricAgg.fieldFormatter()(value)
      }
    ];
    $tooltipScope.$apply();

    return $el.html();
  };
}
