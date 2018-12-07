import { AggTypesMetricsMetricAggTypeProvider } from 'ui/agg_types/metrics/metric_agg_type';
import { RegistryFieldFormatsProvider } from 'ui/registry/field_formats';

export function AggTypesMetricsCardinalityProvider(Private) {
  const MetricAggType = Private(AggTypesMetricsMetricAggTypeProvider);
  const fieldFormats = Private(RegistryFieldFormatsProvider);

  return new MetricAggType({
    name: 'cardinality',
    title: 'Contagem única',
    makeLabel: function (aggConfig) {
      return 'Contagem única de ' + aggConfig.getFieldDisplayName();
    },
    getFormat: function () {
      return fieldFormats.getDefaultInstance('number');
    },
    params: [
      {
        name: 'field'
      }
    ]
  });
}
