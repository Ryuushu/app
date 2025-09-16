from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    category: str
    price: float
    image_url: str
    in_stock: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    description: str
    category: str
    price: float
    image_url: str
    in_stock: bool = True

class RentalItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    daily_rate: float
    image_url: str
    available: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RentalItemCreate(BaseModel):
    name: str
    description: str
    daily_rate: float
    image_url: str
    available: bool = True

class RentalBooking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    rental_item_id: str
    customer_name: str
    customer_email: str
    customer_phone: str
    start_date: str
    end_date: str
    total_days: int
    total_cost: float
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RentalBookingCreate(BaseModel):
    rental_item_id: str
    customer_name: str
    customer_email: str
    customer_phone: str
    start_date: str
    end_date: str
    total_days: int
    total_cost: float

class Article(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    excerpt: str
    image_url: str
    author: str = "Admin"
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ArticleCreate(BaseModel):
    title: str
    content: str
    excerpt: str
    image_url: str
    author: str = "Admin"
    published: bool = True

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    icon: str
    features: List[str]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ServiceCreate(BaseModel):
    name: str
    description: str
    icon: str
    features: List[str]

# Helper functions
def prepare_for_mongo(data):
    if isinstance(data.get('created_at'), datetime):
        data['created_at'] = data['created_at'].isoformat()
    return data

def parse_from_mongo(item):
    if isinstance(item.get('created_at'), str):
        item['created_at'] = datetime.fromisoformat(item['created_at'])
    return item

# Routes
@api_router.get("/")
async def root():
    return {"message": "Teskom.id API"}

# Product routes
@api_router.post("/products", response_model=Product, status_code=201)
async def create_product(product: ProductCreate):
    product_dict = product.dict()
    product_obj = Product(**product_dict)
    product_data = prepare_for_mongo(product_obj.dict())
    await db.products.insert_one(product_data)
    return product_obj

@api_router.get("/products", response_model=List[Product])
async def get_products():
    products = await db.products.find().to_list(1000)
    return [Product(**parse_from_mongo(product)) for product in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**parse_from_mongo(product))

# Rental routes
@api_router.post("/rental-items", response_model=RentalItem, status_code=201)
async def create_rental_item(rental_item: RentalItemCreate):
    rental_dict = rental_item.dict()
    rental_obj = RentalItem(**rental_dict)
    rental_data = prepare_for_mongo(rental_obj.dict())
    await db.rental_items.insert_one(rental_data)
    return rental_obj

@api_router.get("/rental-items", response_model=List[RentalItem])
async def get_rental_items():
    rental_items = await db.rental_items.find().to_list(1000)
    return [RentalItem(**parse_from_mongo(item)) for item in rental_items]

@api_router.post("/rental-bookings", response_model=RentalBooking, status_code=201)
async def create_rental_booking(booking: RentalBookingCreate):
    booking_dict = booking.dict()
    booking_obj = RentalBooking(**booking_dict)
    booking_data = prepare_for_mongo(booking_obj.dict())
    await db.rental_bookings.insert_one(booking_data)
    return booking_obj

@api_router.get("/rental-bookings", response_model=List[RentalBooking])
async def get_rental_bookings():
    bookings = await db.rental_bookings.find().to_list(1000)
    return [RentalBooking(**parse_from_mongo(booking)) for booking in bookings]

# Article routes
@api_router.post("/articles", response_model=Article)
async def create_article(article: ArticleCreate):
    article_dict = article.dict()
    article_obj = Article(**article_dict)
    article_data = prepare_for_mongo(article_obj.dict())
    await db.articles.insert_one(article_data)
    return article_obj

@api_router.get("/articles", response_model=List[Article])
async def get_articles():
    articles = await db.articles.find({"published": True}).to_list(1000)
    return [Article(**parse_from_mongo(article)) for article in articles]

@api_router.get("/articles/{article_id}", response_model=Article)
async def get_article(article_id: str):
    article = await db.articles.find_one({"id": article_id})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return Article(**parse_from_mongo(article))

# Service routes
@api_router.post("/services", response_model=Service)
async def create_service(service: ServiceCreate):
    service_dict = service.dict()
    service_obj = Service(**service_dict)
    service_data = prepare_for_mongo(service_obj.dict())
    await db.services.insert_one(service_data)
    return service_obj

@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find().to_list(1000)
    return [Service(**parse_from_mongo(service)) for service in services]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()