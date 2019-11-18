SELECT 
analysis_types.property as propriedade, 
analyses.value as valor_da_analise, 
users.user_name as usuario,
analyses.date as data 
from analyses 
inner join analysis_types on analysis_types.id = analyses.analysis_type
inner join users on analyses.user_id = users.id; 