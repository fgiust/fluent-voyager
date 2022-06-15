const fluentIntrospection = require('./presets/fluent_introspection.json');

export const PRESETS = {
  Fluent: fluentIntrospection,
};

export const defaultPresetName = 'Fluent';
export const defaultPreset = PRESETS[defaultPresetName];
