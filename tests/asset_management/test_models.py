from .fixtures import *


def test_work_order(db):
    wo = WorkOrder.objects.create(name="Fix Laptop", description="Fix Asset one",
                                  due_date=date(day=6, month=12, year=2021),
                                  maintenance_type="Ins", priority='H',
                                  status='IP'
                                  )
    assert isinstance(wo, WorkOrder)


def test_asset(db, asset_one):
    """
    Test asset model
    """
    assert isinstance(asset_one, Asset)

    asset_one.work_orders = [work_order, work_order]
    asset_one.requests = [request_one]

    assert len(asset_one.work_orders) is 2
    assert len(asset_one.requests) is 1
