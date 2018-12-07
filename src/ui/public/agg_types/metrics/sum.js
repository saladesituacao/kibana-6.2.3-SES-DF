import { AggTypesMetricsMetricAggTypeProvider } from 'ui/agg_types/metrics/metric_agg_type';

export function AggTypesMetricsSumProvider(Private) {
  const MetricAggType = Private(AggTypesMetricsMetricAggTypeProvider);

  return new MetricAggType({
    name: 'sum',
    title: 'Soma',
    makeLabel: function (aggConfig) {
      return 'Soma de ' + aggConfig.getFieldDisplayName();
    },
    params: [
      {
        name: 'field',
        filterFieldTypes: 'number'
      }
    ],
    isScalable: function () {
      return true;
    }
  });
}
