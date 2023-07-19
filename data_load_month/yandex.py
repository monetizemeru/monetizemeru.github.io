from google.oauth2 import service_account
import pandas_gbq
import json
import requests
import pandas as pd
from datetime import datetime, timedelta, date

NAME = "rsya"
# Get the current date
current_date = date.today()

# Calculate the first day of the current month
first_day_current_month = date(current_date.year, current_date.month, 1)

# Subtract one month from the current month
previous_month = first_day_current_month.replace(month=first_day_current_month.month - 1)

# Calculate the first day of the previous month
first_day_previous_month = previous_month.replace(day=1)

# Calculate the first day of the current month
first_day_current_month = date(current_date.year, current_date.month, 1)

# Subtract one month from the current month
previous_month = first_day_current_month - timedelta(days=1)

# Calculate the last day of the previous month
last_day_previous_month = date(current_date.year, current_date.month, 1) - timedelta(days=1)

site_id_rsya = "2334619"

def yandex_data(start_date, end_date, site_id):

    format_start_date = datetime.strftime(start_date,'%Y-%m-%d')
    format_end_date = datetime.strftime(end_date,'%Y-%m-%d')

    #id сайта в РСЯ
    RSYA_filter_site = json.dumps(["page_id","=",site_id])

    url = "https://partner2.yandex.ru/api/statistics2/get.json";
    body = {
        "lang":"en",
        "pretty":2,
        "dimension_field":"date|day",
        "entity_field":"block_caption",
        "period":[format_start_date,format_end_date],
        "field":["partner_wo_nds","shows","hits"],
        "filter":RSYA_filter_site,
    }
    #ТОКЕН ПОСТАВИТЬ ТУТ 
    headers = {'Authorization': 'OAuth y0_AgAEA7qkWRSOAAnTdAAAAADh6DIt2JL1dqOfQTizycBMzdbMUQgkPI4'};

    response = requests.get(url, body, headers=headers);
    response_json= response.json()
    ya_data_points = response_json["data"]["points"]
    yandex_data_all = {}
    
    for i in range(0, len(ya_data_points)):
        yandex_data_all.setdefault("Date",[]).append(ya_data_points[i]['dimensions']['date'][0])
        yandex_data_all.setdefault("Block",[]).append(ya_data_points[i]['dimensions']['block_caption'])
        yandex_data_all.setdefault("Shows",[]).append(ya_data_points[i]['measures'][0]['shows'])
        yandex_data_all.setdefault("Hits",[]).append(ya_data_points[i]['measures'][0]['hits'])
        yandex_data_all.setdefault("Revenue",[]).append(float(ya_data_points[i]['measures'][0]['partner_wo_nds']))

    df_ya = pd.DataFrame(yandex_data_all)
    
    #Форматируем дату под bq
    df_ya['Date'] = pd.to_datetime(df_ya['Date'])
    print(df_ya)
    print(df_ya["Revenue"].sum())
yandex_data(first_day_previous_month,last_day_previous_month,site_id_rsya)