import dataset from './../datasets/dataset.json' assert { type: 'json' };

var locomotion_list = ['Number of steps', 'Frail Score', 'Sarcopenia Score', 'Walked distance']
var sensory_list = ['Sensory_conditions_ps']
var psychological_list = ['Sleep Duration', 'Light Sleep Duration', 'Deep Sleep Duration', 'PHQ9 Score', 'GDS Score', 'Psychological_conditions_ps']
var cognition_list = ['MOCA Score', 'RCS Score', 'Cognition_conditions_ps']
var vitality_list = ['MNA Score', 'SNAQ Score', 'Average Heart Rate', 'Max Heart Rate', 'Min Heart Rate',
                 'HDL Cholesterol', 'LDL Cholesterol', 'BMI', 'Body fat percentage',
                 'Standing Diastolic', 'Standing Systolic', 'Vitality_conditions_ps']

var locomotion_list_ps = ['Number of steps_ps', 'Frail Score_ps', 'Sarcopenia Score_ps', 'Walked distance_ps']
var sensory_list_ps = ['Sensory_conditions_ps']
var psychological_list_ps = ['Sleep Duration_ps', 'Light Sleep Duration_ps', 'Deep Sleep Duration_ps', 'PHQ9 Score_ps', 'GDS Score_ps', 'Psychological_conditions_ps']
var cognition_list_ps = ['MOCA Score_ps', 'RCS Score_ps', 'Cognition_conditions_ps']
var vitality_list_ps = ['MNA Score_ps', 'SNAQ Score_ps', 'Average Heart Rate_ps', 'Max Heart Rate_ps', 'Min Heart Rate_ps',
                        'HDL Cholesterol_ps', 'LDL Cholesterol_ps', 'BMI_ps', 'Body fat percentage_ps',
                        'Standing Diastolic_ps', 'Standing Systolic_ps', 'Vitality_conditions_ps']

var locomotion_list_imputed = ['Number of steimputed_imputed', 'Frail Score_imputed', 'Sarcopenia Score_imputed', 'Walked distance_imputed']
var sensory_list_imputed = ['Sensory_conditions_imputed']
var psychological_list_imputed = ['Sleep Duration_imputed', 'Light Sleep Duration_imputed', 'Deep Sleep Duration_imputed', 'PHQ9 Score_imputed', 'GDS Score_imputed', 'imputedychological_conditions_imputed']
var cognition_list_imputed = ['MOCA Score_imputed', 'RCS Score_imputed', 'Cognition_conditions_imputed']
var vitality_list_imputed = ['MNA Score_imputed', 'SNAQ Score_imputed', 'Average Heart Rate_imputed', 'Max Heart Rate_imputed', 'Min Heart Rate_imputed',
                        'HDL Cholesterol_imputed', 'LDL Cholesterol_imputed', 'BMI_imputed', 'Body fat percentage_imputed',
                        'Standing Diastolic_imputed', 'Standing Systolic_imputed', 'Vitality_conditions_imputed']

var domains = ['Locomotion', 'Sensory', 'Psychological', 'Cognition', 'Vitality', 'Intrinsic Capacity']

var domains_coverage = ['Locomotion_coverage', 'Sensory_coverage', 'Psychological_coverage', 'Cognition_coverage', 'Vitality_coverage', 'Intrinsic Capacity_coverage']
var domains_imputed = ['Locomotion_imputed', 'Sensory_imputed', 'Psychological_imputed', 'Cognition_imputed', 'Vitality_imputed', 'Intrinsic Capacity_imputed']

export {locomotion_list, sensory_list, psychological_list, cognition_list, vitality_list, locomotion_list_ps, sensory_list_ps, 
    psychological_list_ps, cognition_list_ps, vitality_list_ps, locomotion_list_imputed, sensory_list_imputed, 
    psychological_list_imputed, cognition_list_imputed, vitality_list_imputed, domains, domains_coverage, domains_imputed};