SELECT
propriedade.nome as propriedade, 
analise_aux.valor_analise as valor, 
analise_aux.resultado as resultado,
analise.data_analise as data_da_analise
FROM analise_aux
inner join propriedade on analise_aux.propriedadeID = propriedade.id
inner join analise on analise_aux.analiseID = analise.id;

-- ULTIMAS CINCO ANALISES DE UMA PROPRIEDADE
SELECT 
analise_aux.valor_analise as valor, 
analise_aux.resultado as resultado,
analise.data_analise as data_da_analise
FROM analise_aux
inner join propriedade on analise_aux.propriedadeID = propriedade.id
inner join analise on analise_aux.analiseID = analise.id
WHERE propriedade.id = 1
ORDER BY analise.data_analise DESC
LIMIT 5;

-- MEDIA DAS CINCO ANALISES DE UMA PROPRIEDADE
SELECT 
avg(analise_aux.valor_analise) as media
FROM analise_aux
inner join propriedade on analise_aux.propriedadeID = propriedade.id
inner join analise on analise_aux.analiseID = analise.id
WHERE propriedade.id = 1
ORDER BY analise.data_analise DESC
LIMIT 5;

-- ANALISE DIARIA
SELECT
analise_aux.valor_analise as valor, 
analise_aux.resultado as resultado,
analise.data_analise as data_da_analise
FROM analise_aux
inner join propriedade on analise_aux.propriedadeID = propriedade.id
inner join analise on analise_aux.analiseID = analise.id
WHERE propriedade.id = 1 
AND
analise.data_analise BETWEEN '2019-11-17 00:00:00' AND '2019-11-17 23:59:59';