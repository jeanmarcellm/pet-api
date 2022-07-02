npx sequelize model:create --name user --attributes first_name:string,last_name:string,cpf:string,rg:string,cnpj:string,email:string,password_hash:string,company_name:string,phone:string
npx sequelize model:create --name user_type --attributes name:string,description:string
npx sequelize model:create --name address --attributes street:string,number:string,district:string,zip_code:string,city:string,state:string,country:string,lat:float,lng:float

npx sequelize model:create --name product --attributes name:string,description:string,barcode:string
npx sequelize model:create --name product_price --attributes cost_price:float,sale_price:float
npx sequelize model:create --name product_spec --attributes value_type:integer,value_int:integer,value_float:float,value_string:string
npx sequelize model:create --name product_type --attributes name:string,description:string
npx sequelize model:create --name product_category --attributes name:string,description:string
npx sequelize model:create --name product_detail --attributes name:string,label:string,description:string

npx sequelize model:create --name brand --attributes name:string,description:string,slogan:string
npx sequelize model:create --name quantity_type --attributes name:string,quantity:float,unit:string

npx sequelize model:create --name store_product --attributes is_active:boolean
npx sequelize model:create --name store --attributes name:string,description:string

npx sequelize model:create --name place --attributes name:string,description:string
npx sequelize model:create --name place_social --attributes name:string,value:string

npx sequelize model:create --name taplist --attributes common_name:string
npx sequelize model:create --name taplist_config --attributes common_name:string,primary_color:string,secundary_color:string,primary_font_size:integer,secondary_font_size:integer
npx sequelize model:create --name taplist_screen --attributes interval:integer

npx sequelize model:create --name screen_type --attributes name:string
npx sequelize model:create --name screen_argument --attributes value_int:integer,value_float:float,value_string:string
npx sequelize model:create --name screen_argument_type --attributes name:string,type:string

npx sequelize model:create --name image --attributes data:text
