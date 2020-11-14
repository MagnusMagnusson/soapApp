from django.db import models

# Create your models here.
class Ingredient(models.Model):
    FRAGRANCE = 'FR'
    COLORANT = 'CL'
    FAT = 'FT'
    LIQUID = 'LQ'
    LYE = 'AL'
    OTHER = 'OT'
    INGREDIENT_TYPE_CHOICE = [
        (FRAGRANCE, 'Ilmefni'),
        (COLORANT, 'Litarefni'),
        (FAT, 'Fitur/Olíur'),
        (LIQUID, 'Vökvi'),
        (LYE, 'Alkalíð/Basi'),
        (OTHER, 'Annað'),
    ]

    name = models.CharField(max_length=50, null=False, default="")
    ingredient_type = models.CharField(
        max_length=2,
        choices=INGREDIENT_TYPE_CHOICE,
        default=FRAGRANCE,
    )
    notes = models.TextField(default="", null=False)
    url = models.URLField(default="")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    currency = models.CharField(max_length=3, default="EUR")
    image = models.FileField(upload_to="uploads/img/ingredients/", null=True)

    def object(self):
        return {
            'id': self.id, # pylint: disable=no-member
            'name':self.name,
            'type': self.ingredient_type,
            'type_name': [name for (key,name) in self.INGREDIENT_TYPE_CHOICE if key==self.ingredient_type][0],
            'notes':self.notes,
            'url':self.url,
            'price':self.price,
            'currency':self.currency,
            'picture_path':self.image.url if bool(self.image) else "", # pylint: disable=no-member
        }
    
    @staticmethod
    def create(data):
        o = Ingredient()
        o.name = data['name']
        o.ingredient_type = data['type']
        o.notes = data['notes'] if 'notes' in data else ""
        o.url = data['url'] if 'url' in data else ""
        o.price = data['price'] if 'price' in data else 0
        o.currency = data['currency'] if 'currency' in data else 'ISK'
        o.save()
        return o


class Recipie(models.Model):
    name = models.CharField(max_length=128, null=False, default="Uppskrift")
    notes = models.TextField(default="")
    image = models.FileField(upload_to="uploads/img/recipies/", null=True)
    def object(self):
        return {
            'id':self.id, # pylint: disable=no-member
            'name':self.name,
            'notes':self.notes,
            'ingredients':[x.object() for x in self.RecipieIngredient_set.all()], # pylint: disable=no-member
            'picture_path':self.image.url if bool(self.image) else "", # pylint: disable=no-member
        }

class RecipieIngredient(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    recipie = models.ForeignKey(Recipie, on_delete=models.CASCADE)
    amount = models.DecimalField(null=False, default=0, decimal_places=2,max_digits=8)
    def object(self):
        return{ 
        'ingredient':{
            'name':self.ingredient.name,
            'id':self.ingredient.id # pylint: disable=no-member
        },
        'recipie':{
            'name':self.recipie.name,
            'id':self.recipie.id # pylint: disable=no-member
        },
        'amount':self.amount+'g'
        }
        
class Design(models.Model):
    name = models.CharField(max_length=128)
    notes = models.TextField(default="")
    ingredients = models.ManyToManyField(Ingredient)
    image = models.FileField(upload_to="uploads/img/designs/", null=True)
    def object(self):
        return{
            'name':self.name,
            'id':self.id, # pylint: disable=no-member
            'ingredients':[{'id':x.id, 'name':x.name} for x in self.ingredients.all()], # pylint: disable=no-member
            'picture_path':self.image.url if bool(self.image) else "", # pylint: disable=no-member
            'notes':self.notes
        }

class Batch(models.Model):
    name = models.CharField(default="", max_length=128)
    design = models.ForeignKey(Design,  on_delete=models.CASCADE)
    recipie = models.ForeignKey(Recipie, on_delete=models.CASCADE)
    notes = models.TextField(default="")
    image = models.FileField(upload_to="uploads/img/batches/", null=True)
    def object(self):
        states = self.Batch_State_set.all().order_by('date')
        return {
            'name':self.name,
            'design':{ 'name':self.design.name, 'id':self.design.id}, # pylint: disable=no-member
            'recipie':{ 'name':self.recipie.name, 'id':self.recipie.id}, # pylint: disable=no-member
            'notes':self.notes,
            'picture_path':self.image.url if bool(self.image) else "", # pylint: disable=no-member
            'status':[x.object() for x in states], # pylint: disable=no-member
            'current_status': states[0].object() if len(states) > 0 else None # pylint: disable=no-member
        }

class Batch_State(models.Model):
    STATE_DESIGN = '0_DES'
    STATE_PREP = '1_PRE'
    STATE_MANUFACTURE='2_MAN'
    STATE_DRYING='3_DRY'
    STATE_CURING='4_CUR'
    STATE_READY='5_DON'
    STATE_TYPE_CHOICE = [
        (STATE_DESIGN, 'Hönnun'),
        (STATE_PREP, 'Undirbúningur'),
        (STATE_MANUFACTURE, 'Framleiðsla'),
        (STATE_DRYING, 'Sápumyndun'),
        (STATE_CURING, 'Þurrkun'),
        (STATE_READY, 'Tilbúið'),
    ]
    state = models.CharField(
        max_length=5,
        choices=STATE_TYPE_CHOICE,
        default=STATE_DESIGN,
    )
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)
    date = models.DateTimeField()
    def object(self):
        return{
            'state':self.state,
            'state_description':[x for (a,x) in self.STATE_TYPE_CHOICE if a==self.state][0],
            'date':self.date
        }
    
