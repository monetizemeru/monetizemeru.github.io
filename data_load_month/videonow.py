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


site_videonow = "5565"



def videonow_data(start_date, end_date, site_id):
    format_start_date = datetime.strftime(start_date,'%Y%m%d')
    format_end_date = datetime.strftime(end_date,'%Y%m%d')

    url = "https://api.videonow.ru/sites/"+site_id+"/stat";
    query = {
        'from':format_start_date,
        'to': format_end_date
    }
    headers = {'X-Auth-Token':'0584f279ded4d612b06dd20237d21dc709200f79153f65e194c13ab04ec56ac8'};
    response = requests.get(url, headers=headers, params = query);
    vn_data = response.json()
    #print(vn_data[0])
    vn_all_data = {}
    for i in range(len(vn_data)):
        try:
            for k in range(len(vn_data[i]['stat'])):
                date = vn_data[i]['stat'][k]['date']
                money = float(vn_data[i]['stat'][k]['money'])
                shows = vn_data[i]['stat'][k]['viewable']
                hits = vn_data[i]['stat'][k]['real']
                vn_all_data.setdefault("Date",[]).append(date)
                vn_all_data.setdefault("Block",[]).append(vn_data[i]['title'])
                vn_all_data.setdefault("Hits",[]).append(hits)
                vn_all_data.setdefault("Shows",[]).append(shows)
                vn_all_data.setdefault("Revenue",[]).append(money)
        except:
            money = float(0)
            shows = 0
            hits = 0
            vn_all_data.setdefault("Date",[]).append(date)
            vn_all_data.setdefault("Block",[]).append(vn_data[i]['title'])
            vn_all_data.setdefault("Hits",[]).append(hits)
            vn_all_data.setdefault("Shows",[]).append(shows)
            vn_all_data.setdefault("Revenue",[]).append(money)
      
        
    
    
    df_vn = pd.DataFrame(vn_all_data)

    #Форматируем дату под bq
    df_vn['Date'] = pd.to_datetime(df_vn['Date'])
    print(df_vn)
videonow_data(first_day_previous_month,last_day_previous_month, site_videonow)