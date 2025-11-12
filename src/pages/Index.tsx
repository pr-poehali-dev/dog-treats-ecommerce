import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Хрустящие косточки',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/4270008b-dcd7-452c-986c-97298adfb589/files/1b340d27-34de-433e-b572-35c75b547df2.jpg',
    description: 'Натуральные лакомства в форме косточек',
    category: 'Бестселлер'
  },
  {
    id: 2,
    name: 'Мясное ассорти',
    price: 680,
    image: 'https://cdn.poehali.dev/projects/4270008b-dcd7-452c-986c-97298adfb589/files/3fdfa1ec-f290-4d78-8313-6defd61da39f.jpg',
    description: 'Микс из говядины, курицы и индейки',
    category: 'Новинка'
  },
  {
    id: 3,
    name: 'Витаминные снеки',
    price: 520,
    image: 'https://cdn.poehali.dev/projects/4270008b-dcd7-452c-986c-97298adfb589/files/1b340d27-34de-433e-b572-35c75b547df2.jpg',
    description: 'С добавлением омега-3 и витаминов',
    category: 'Хит'
  },
  {
    id: 4,
    name: 'Сырные палочки',
    price: 390,
    image: 'https://cdn.poehali.dev/projects/4270008b-dcd7-452c-986c-97298adfb589/files/3fdfa1ec-f290-4d78-8313-6defd61da39f.jpg',
    description: 'Нежные палочки с натуральным сыром',
    category: 'Популярное'
  },
  {
    id: 5,
    name: 'Рыбные деликатесы',
    price: 720,
    image: 'https://cdn.poehali.dev/projects/4270008b-dcd7-452c-986c-97298adfb589/files/1b340d27-34de-433e-b572-35c75b547df2.jpg',
    description: 'Из лосося и трески премиум-качества',
    category: 'Премиум'
  },
  {
    id: 6,
    name: 'Фруктовые кусочки',
    price: 480,
    image: 'https://cdn.poehali.dev/projects/4270008b-dcd7-452c-986c-97298adfb589/files/3fdfa1ec-f290-4d78-8313-6defd61da39f.jpg',
    description: 'С яблоком и бананом, без сахара',
    category: 'Новинка'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🐕</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ПёсЛакомка
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`font-semibold transition-colors ${
                  activeSection === 'home' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('catalog')}
                className={`font-semibold transition-colors ${
                  activeSection === 'catalog' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`font-semibold transition-colors ${
                  activeSection === 'about' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                О нас
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className={`font-semibold transition-colors ${
                  activeSection === 'contacts' ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Контакты
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id} className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-7 w-7"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 ml-auto text-destructive"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span>{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <section className="py-20 animate-fade-in">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-5xl font-bold mb-6 leading-tight">
                    Лакомства, которые{' '}
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                      любит ваш питомец
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    Натуральные и полезные угощения для здоровья и радости вашей собаки
                  </p>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setActiveSection('catalog')}
                    >
                      Смотреть каталог
                    </Button>
                    <Button size="lg" variant="outline">
                      Узнать больше
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://cdn.poehali.dev/projects/4270008b-dcd7-452c-986c-97298adfb589/files/642b7d4d-f04e-4eed-9997-2bbc7e7145b5.jpg"
                    alt="Счастливая собака"
                    className="rounded-3xl shadow-2xl animate-scale-in"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Icon name="Heart" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">100%</p>
                        <p className="text-sm text-gray-600">Натуральные</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'catalog' && (
          <section className="py-16 animate-fade-in">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Наш каталог</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-secondary">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                        <Button onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-16 animate-fade-in">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-4xl font-bold text-center mb-12">О нас</h2>
              <Card className="p-8">
                <div className="space-y-6 text-lg text-gray-700">
                  <p>
                    <strong className="text-primary">ПёсЛакомка</strong> — это семейный бизнес,
                    основанный любителями собак для любителей собак. Мы производим натуральные
                    лакомства из отборных ингредиентов.
                  </p>
                  <p>
                    Наша миссия — сделать каждую собаку счастливее через вкусные и полезные
                    угощения. Все продукты проходят строгий контроль качества.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center p-6 bg-primary/5 rounded-xl">
                      <div className="text-4xl mb-2">🏆</div>
                      <p className="font-bold text-2xl text-primary">5 лет</p>
                      <p className="text-sm text-gray-600">На рынке</p>
                    </div>
                    <div className="text-center p-6 bg-secondary/5 rounded-xl">
                      <div className="text-4xl mb-2">❤️</div>
                      <p className="font-bold text-2xl text-secondary">10000+</p>
                      <p className="text-sm text-gray-600">Довольных питомцев</p>
                    </div>
                    <div className="text-center p-6 bg-accent/5 rounded-xl">
                      <div className="text-4xl mb-2">✨</div>
                      <p className="font-bold text-2xl text-accent">100%</p>
                      <p className="text-sm text-gray-600">Натуральные</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="py-16 animate-fade-in">
            <div className="container mx-auto px-4 max-w-2xl">
              <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Телефон</p>
                      <p className="text-gray-600">+7 (999) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full">
                      <Icon name="Mail" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="text-gray-600">info@peslakomka.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Icon name="MapPin" size={24} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Адрес</p>
                      <p className="text-gray-600">г. Москва, ул. Собачья, д. 12</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon name="Clock" size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Режим работы</p>
                      <p className="text-gray-600">Пн-Вс: 9:00 - 21:00</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🐕</span>
                <h3 className="text-xl font-bold">ПёсЛакомка</h3>
              </div>
              <p className="text-gray-400">
                Натуральные лакомства для вашего питомца
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <div className="space-y-2 text-gray-400">
                <button onClick={() => setActiveSection('home')} className="block hover:text-white">
                  Главная
                </button>
                <button onClick={() => setActiveSection('catalog')} className="block hover:text-white">
                  Каталог
                </button>
                <button onClick={() => setActiveSection('about')} className="block hover:text-white">
                  О нас
                </button>
                <button onClick={() => setActiveSection('contacts')} className="block hover:text-white">
                  Контакты
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ПёсЛакомка. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
