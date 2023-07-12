import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Product } from '../models/product.model';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

fdescribe('ProductsService', () => {
  //let productsServiceSpy : jasmine.SpyObj<ProductsService>;
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService
       ]
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("Test getProducts",()=>{
    it('should get all products', (done)=>{
      //Arrange
      const mockData: Product[] = [
        {
          id: 1,
          name: "product 1",
          images: [
              "https://picsum.photos/id/237/200/300"
          ],
          description: "esta es un....",
          price: 50,
          categoryId: 2
        },
        {
          id: 2,
          name: "product 2",
          images: [
              "https://picsum.photos/id/237/200/300"
          ],
          description: "esta es un....",
          price: 60,
          categoryId: 2
        }
      ];
      //Act
      service.getAllProductsSimple().subscribe((data) =>{
        //Assert
        expect(data.length).toEqual(mockData.length)
        done();
      });

      //http config
      const url = environment.API_URL;
      const req = httpController.expectOne(`${url}/products`);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
      /*const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProduct']);
      productsServiceSpy.getProduct.and.returnValue(product);
      service = new ProductsService(productsServiceSpy);*/

      /*expect(productsServiceSpy.getProduct(1)).toEqual({
        id: 1,
        name: "product 1",
        images: [
            "https://picsum.photos/id/237/200/300"
        ],
        description: "esta es un....",
        price: 50,
        categoryId: 2
      });
      expect(productsServiceSpy.getProduct).toHaveBeenCalled();
      expect(productsServiceSpy.getProduct).toHaveBeenCalledTimes(1);*/
