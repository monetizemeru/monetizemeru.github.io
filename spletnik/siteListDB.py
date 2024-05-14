#список сайтов и их ID, шаблонов. Он нужен для того, чтобы получать актуальный список шаблонов и сайтов, и чтобы под каждый сайт выбирался необходимый шаблон. Важно чтобы название шаблона и сайта совпадали
import pandas as pd
import json
import xmltodict
import xml.etree.ElementTree as et
import requests

def list_of_sites():
    url_request = "https://adfox.yandex.ru/api/v1";
    body = {
    'object':'account',
    'action':'list',
    'actionObject':'website',
    'limit':'300'
    }
    headers = {'Authorization': 'OAuth y0_AgAEA7qkWRSOAAnTdAAAAAD6OVrCAAAahMDDtVBFZYf1IUuJGXVcQpSNUQ'};

    # Make an HTTP request to get XML response
    response = requests.get(url_request, body, headers=headers)

    doc = xmltodict.parse(response.text,encoding='utf-8', process_namespaces=False, namespace_separator=':')
    site_response = json.dumps(doc, sort_keys=True)
    site_data = json.loads(site_response)

    #выводим список сайтов
    sites = site_data['response']['result']['data']

    siteList = {}
    for i in range(1,len(sites)):
        name_row = 'row' + str(i)
        siteName = sites[name_row]['name']
        siteID = sites[name_row]['ID']
        siteList.setdefault("SiteName",[]).append(siteName)
        siteList.setdefault("SiteID",[]).append(siteID)
    df = pd.DataFrame(siteList)
    #тут надо дописать, чтобы просто сохранялся json файл 
    converted_data = [{"id": int(site_id), "name": site_name} for site_id, site_name in zip(siteList["SiteID"], siteList["SiteName"])]
    return converted_data
    
def list_of_templates_mobile():
    url_request = "https://adfox.yandex.ru/api/v1";
    body = {
    'object':'bannerType',
    'action':'list',
    'actionObject':'template',
    'objectID':149998
    }
    headers = {'Authorization': 'OAuth y0_AgAEA7qkWRSOAAnTdAAAAAD6OVrCAAAahMDDtVBFZYf1IUuJGXVcQpSNUQ'};

    # Make an HTTP request to get XML response
    response = requests.get(url_request, body, headers=headers)

    doc = xmltodict.parse(response.text,encoding='utf-8', process_namespaces=False, namespace_separator=':')
    site_response = json.dumps(doc, sort_keys=True)
    site_data = json.loads(site_response)
    #выводим список сайтов
    sites = site_data['response']['result']['data']

    siteList = {}
    for i in range(1,len(sites)):
        name_row = 'row' + str(i)
        siteName = sites[name_row]['templateName']
        siteID = sites[name_row]['templateID']
        siteList.setdefault("SiteName",[]).append(siteName)
        siteList.setdefault("SiteID",[]).append(siteID)
    df = pd.DataFrame(siteList)
    #тут надо дописать, чтобы просто сохранялся json файл 
    converted_data = [{"templateMobileId": int(site_id), "name": site_name} for site_id, site_name in zip(siteList["SiteID"], siteList["SiteName"])]
    
    
    return converted_data

def list_of_templates_desktop():
    url_request = "https://adfox.yandex.ru/api/v1";
    body = {
    'object':'bannerType',
    'action':'list',
    'actionObject':'template',
    'objectID':149488
    }
    headers = {'Authorization': 'OAuth y0_AgAEA7qkWRSOAAnTdAAAAAD6OVrCAAAahMDDtVBFZYf1IUuJGXVcQpSNUQ'};

    # Make an HTTP request to get XML response
    response = requests.get(url_request, body, headers=headers)

    doc = xmltodict.parse(response.text,encoding='utf-8', process_namespaces=False, namespace_separator=':')
    site_response = json.dumps(doc, sort_keys=True)
    site_data = json.loads(site_response)
    #выводим список сайтов
    sites = site_data['response']['result']['data']

    siteList = {}
    for i in range(1,len(sites)):
        name_row = 'row' + str(i)
        siteName = sites[name_row]['templateName']
        siteID = sites[name_row]['templateID']
        siteList.setdefault("SiteName",[]).append(siteName)
        siteList.setdefault("SiteID",[]).append(siteID)
    df = pd.DataFrame(siteList)
    #тут надо дописать, чтобы просто сохранялся json файл 
    converted_data = [{"templateDesktopId": int(site_id), "name": site_name} for site_id, site_name in zip(siteList["SiteID"], siteList["SiteName"])]
    return converted_data


#def union list with mobile templates
site_list = list_of_sites()
template_list_mobile = list_of_templates_mobile()
template_list_desktop = list_of_templates_desktop()

# Создаем словарь из второго списка для удобства поиска по имени
dict2 = {item['name']: item['templateMobileId'] for item in template_list_mobile}

# Обновляем первый список значениями templateMobileid из второго списка
for item in site_list:
    if item['name'] in dict2:
        item['templateMobileId'] = dict2[item['name']]
    elif item['name'] in ['kp doctor', 'kp woman', 'kp expert', 'kp family']:
        item['templateMobileId'] = dict2.get('kp.ru', None)

# Создаем словарь из второго списка для удобства поиска по имени
dict3 = {item['name']: item['templateDesktopId'] for item in template_list_desktop}
# Обновляем первый список значениями templateDesktopid из второго списка
for item in site_list:
    if item['name'] in dict3:
        item['templateDesktopId'] = dict3[item['name']]
    elif item['name'] in ['kp doctor', 'kp woman', 'kp expert', 'kp family']:
        item['templateDesktopId'] = dict3.get('kp.ru', None)

with open('sites_list.json', 'w') as json_file:
        json.dump(site_list, json_file)
        json_file.close()


