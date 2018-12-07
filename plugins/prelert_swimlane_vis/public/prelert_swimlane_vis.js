/*
 ****************************************************************************
 *                                                                          *
 * Copyright 2012-2018 Elasticsearch BV                                     *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 *                                                                          *
 ****************************************************************************
 */

import './prelert_swimlane_vis.less';
import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import optionsTemplate from './prelert_swimlane_vis_options.html';

import './prelert_swimlane_vis_controller';
import template from './prelert_swimlane_vis.html';


function PrelertSwimlaneProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const Schemas = Private(VisSchemasProvider);

  return VisFactory.createAngularVisualization({
    name: 'ml_swimlane',
    title: 'Swimlane',
    icon: 'fa fa-bars',
    description: 'Swimlane visualization displaying the behavior of a metric ' +
                  'over time across a field from the results. ' +
                  'Each lane displays a different value of the field, with the ' +
                  'relative size of the metric over each interval indicated ' +
                  'by the color of the symbol at that time. ' +
                  'Created by Prelert.',
    category: CATEGORY.OTHER,
    visConfig: {
      defaults: {
        interval: { display: 'Auto', val: 'auto' },
        thresholdBands: [
          { value: 0, color: '#d2e9f7' },
          { value: 3, color: '#8bc8fb' },
          { value: 25, color: '#ffdd00' },
          { value: 50, color: '#ff7e00' },
          { value: 75, color: '#fe5050' }
        ],
        unknownThresholdColor: '#e6e6e6',
        tooltipNumberFormat: '0.0',
        showLegend: true,
        alphabetSortLaneLabels: 'off'
      },
      template,
      intervalOptions: [
        { display: 'Auto', val: 'auto' },
        /*
        { display: '5 minutos', val: 'custom', customInterval: '5m' },
        { display: '10 minutos', val: 'custom', customInterval: '10m' },
        { display: '30 minutos', val: 'custom', customInterval: '30m' },
        { display: '1 hora', val: 'h' },
        { display: '3 horas', val: 'custom', customInterval: '3h' },
        { display: '12 horas', val: 'custom', customInterval: '12h' },
        */
        { display: '1 dia', val: 'd' }]
    },
    responseHandler: 'none',
    editorConfig: {
      collections: {},
      optionsTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Value',
          min: 1,
          max: 1,
          aggFilter: [ 'count', 'avg', 'sum', 'min', 'max', 'cardinality' ]
        },
        {
          group: 'buckets',
          name: 'viewBy',
          icon: 'fa fa-eye',
          title: 'View by',
          mustBeFirst: true,
          min: 0,
          max: 1,
          aggFilter: 'terms'
        },
        {
          group: 'buckets',
          name: 'timeSplit',
          icon: 'fa fa-th',
          title: 'Time field',
          min: 1,
          max: 1,
          aggFilter: 'date_histogram'
        }
      ])
    }
  });
}

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(PrelertSwimlaneProvider);

// export the provider so that the visType can be required with Private()
export default PrelertSwimlaneProvider;
