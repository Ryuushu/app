import requests
import sys
import json
from datetime import datetime

class TeskomAPITester:
    def __init__(self, base_url="https://elecsys-teskom.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                        if len(response_data) > 0:
                            print(f"   Sample item keys: {list(response_data[0].keys())}")
                    else:
                        print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Not a dict'}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.status_code < 400 else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_products_endpoints(self):
        """Test product-related endpoints"""
        print("\n📦 TESTING PRODUCTS ENDPOINTS")
        
        # Test GET products
        success, products = self.run_test("Get Products", "GET", "products", 200)
        
        # Test POST product
        sample_product = {
            "name": "Test Panel Listrik Industrial",
            "description": "Panel listrik berkualitas tinggi untuk kebutuhan industrial",
            "category": "Panel Listrik",
            "price": 2500000,
            "image_url": "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5",
            "in_stock": True
        }
        
        create_success, created_product = self.run_test(
            "Create Product", "POST", "products", 201, sample_product
        )
        
        # Test GET specific product if creation was successful
        if create_success and 'id' in created_product:
            self.run_test(
                "Get Specific Product", "GET", f"products/{created_product['id']}", 200
            )
        
        return success

    def test_rental_endpoints(self):
        """Test rental-related endpoints"""
        print("\n🏗️ TESTING RENTAL ENDPOINTS")
        
        # Test GET rental items
        success, rental_items = self.run_test("Get Rental Items", "GET", "rental-items", 200)
        
        # Test POST rental item
        sample_rental = {
            "name": "Test Generator Diesel 15KVA",
            "description": "Generator portable untuk kebutuhan darurat",
            "daily_rate": 350000,
            "image_url": "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5",
            "available": True
        }
        
        create_success, created_rental = self.run_test(
            "Create Rental Item", "POST", "rental-items", 201, sample_rental
        )
        
        # Test rental booking
        if create_success and 'id' in created_rental:
            sample_booking = {
                "rental_item_id": created_rental['id'],
                "customer_name": "Test Customer",
                "customer_email": "test@example.com",
                "customer_phone": "+62812345678",
                "start_date": "2024-02-01",
                "end_date": "2024-02-05",
                "total_days": 4,
                "total_cost": 1400000
            }
            
            self.run_test(
                "Create Rental Booking", "POST", "rental-bookings", 201, sample_booking
            )
            
            # Test GET rental bookings
            self.run_test("Get Rental Bookings", "GET", "rental-bookings", 200)
        
        return success

    def test_articles_endpoints(self):
        """Test article-related endpoints"""
        print("\n📰 TESTING ARTICLES ENDPOINTS")
        
        # Test GET articles
        success, articles = self.run_test("Get Articles", "GET", "articles", 200)
        
        # Test POST article
        sample_article = {
            "title": "Test Panduan Memilih Panel Listrik untuk Rumah",
            "content": "Artikel lengkap tentang cara memilih panel listrik yang tepat untuk kebutuhan rumah tangga...",
            "excerpt": "Panduan praktis memilih panel listrik sesuai kebutuhan rumah Anda",
            "image_url": "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5",
            "author": "Tim Teskom",
            "published": True
        }
        
        create_success, created_article = self.run_test(
            "Create Article", "POST", "articles", 201, sample_article
        )
        
        # Test GET specific article if creation was successful
        if create_success and 'id' in created_article:
            self.run_test(
                "Get Specific Article", "GET", f"articles/{created_article['id']}", 200
            )
        
        return success

    def test_services_endpoints(self):
        """Test service-related endpoints"""
        print("\n🔧 TESTING SERVICES ENDPOINTS")
        
        # Test GET services
        success, services = self.run_test("Get Services", "GET", "services", 200)
        
        # Test POST service
        sample_service = {
            "name": "Test Instalasi Listrik",
            "description": "Layanan instalasi listrik profesional untuk residential dan komersial",
            "icon": "zap",
            "features": ["Instalasi Rumah", "Instalasi Pabrik", "Maintenance Berkala", "Emergency Service"]
        }
        
        create_success, created_service = self.run_test(
            "Create Service", "POST", "services", 201, sample_service
        )
        
        return success

def main():
    print("🚀 Starting Teskom.id API Testing...")
    print("=" * 60)
    
    # Setup
    tester = TeskomAPITester()
    
    # Test root endpoint
    print("\n🏠 TESTING ROOT ENDPOINT")
    tester.test_root_endpoint()
    
    # Test all endpoints
    tester.test_products_endpoints()
    tester.test_rental_endpoints()
    tester.test_articles_endpoints()
    tester.test_services_endpoints()
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())