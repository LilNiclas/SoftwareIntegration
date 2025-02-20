from datetime import datetime
#datetime nr 1 er selve biblioteket
#den bruger iso 8601
current_date = datetime.now()
print(current_date)
print(current_date.strftime('%Y-%m-%d %H:%M:%S'))

#Undgå problemer, brug UTC eller Unix
